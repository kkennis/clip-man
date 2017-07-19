import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import Clip from '../components/clip';
import {
    loadClips,
    goToAdd,
    goToSearch,
    moveFocusDown,
    moveFocusUp,
    removeClip
} from '../actions';
import keycodes from '../constants/keycodes';
const ipcRenderer = window.require('electron').ipcRenderer;

class ClipsList extends Component {
    clipRefs = [];

    componentWillMount() {
        this.props.dispatch(loadClips());
    }

    componentWillUpdate() {
        this.clipRefs = [];
    }

    componentDidMount() {
        this._doFocus();
    }

    componentDidUpdate() {
        this._doFocus();
    }

    _doFocus() {
        if (this.props.focus !== null) {
            this.clipRefs[this.props.focus].el.focus();
        }
    }

    handleListKeyUp = (event) => {
        if (event.ctrlKey) {
            if (event.keyCode === keycodes.ADD) {
                this.props.dispatch(goToAdd());
            } else if (event.keyCode === keycodes.SEARCH) {
                this.props.dispatch(goToSearch());
            } else if (event.keyCode === keycodes.DELETE_CLIP) {
                const clipData = this.clipRefs[this.props.focus].data;
                this.props.dispatch(removeClip(clipData));
            } else if (event.keyCode === keycodes.QUIT_APP) {
                ipcRenderer.send('quit');
            }
        } else {
            if (event.keyCode === keycodes.COPY_CLIP) {
                this._doCopy(event);
            } else if (event.keyCode === keycodes.TOGGLE_DOWN && this.props.focus < this.clipRefs.length - 1) {
                this.props.dispatch(moveFocusDown());
            } else if (event.keyCode === keycodes.TOGGLE_UP) {
                this.props.dispatch(moveFocusUp());
            } else if (event.keyCode === keycodes.GO_BACK) {
                this.props.dispatch(goToSearch());
            }

        }
    }

    _doCopy = (event) => {
        const { value } = this.clipRefs[this.props.focus].data;
        copy(value);
        event.target.blur();
        ipcRenderer.send('selected');
    }

    render() {
        if (this.props.clips.length === 0) {
            return (
                <div className='clip-container'>
                    <h4 className='no-clips'>No clips yet. Add some!</h4>
                </div>
            );
        } else {
            const clips = this.props.clips.map((clip, index) =>
                <Clip
                    key={index}
                    clip={clip}
                    clipRef={(clipEl) => { this.clipRefs[index] = { el: clipEl, data: clip }; }}
                />
            );

            return (
                <div className='clip-container' onKeyUp={this.handleListKeyUp}>
                    {clips}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const clips = state.search ?
        state.clips.filter((clip) => clip.key.match(state.search))
        : state.clips;

    return {
        focus: state.focus,
        clips: clips
    };
};

export default connect(mapStateToProps)(ClipsList);
