import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    updateSearch,
    goToAdd,
    goToSearch,
    moveFocusDown,
    addClip
} from '../actions';
import keycodes from '../constants/keycodes';
import AddControl from '../components/add-control';
import SearchControl from '../components/search-control';
const ipcRenderer = window.require('electron').ipcRenderer;

class ControlBar extends Component {
    componentDidMount() {
        this._doFocus();
    }

    componentDidUpdate() {
        this._doFocus();
    }

    _doFocus() {
        if (this.props.focus === null) {
            if (this.searchRef) {
                this.searchRef.focus()
            } else if (this.keyRef) {
                this.keyRef.focus();
            }
        }
    }

    handleSearchKeyUp = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.ADD) {
            this.props.dispatch(goToAdd());
        } else if (event.keyCode === keycodes.TOGGLE_DOWN) {
            this.props.dispatch(moveFocusDown());
        } else if (event.ctrlKey && event.keyCode === keycodes.QUIT_APP) {
            ipcRenderer.send('quit');
        }
    }

    updateSearch = (event) => {
        const searchStr = event.currentTarget.value;
        this.props.dispatch(updateSearch(searchStr));
    }

    handleAddKeyUp = (event) => {
        if (event.keyCode === keycodes.GO_BACK) {
            this.props.dispatch(goToSearch());
        } else if (event.keyCode === keycodes.SWITCH_FIELD) {
            event.preventDefault();
            this.valueRef === document.activeElement ? this.valueRef.focus() : this.keyRef.focus();
        } else if (event.ctrlKey && event.keyCode === keycodes.QUIT_APP) {
            ipcRenderer.send('quit');
        }
    }

    addClip = (clipData) => {
        this.props.dispatch(addClip(clipData));
    }

    render() {
        if (this.props.mode === 'add') {
            return <AddControl
                onKeyUp={this.handleAddKeyUp}
                addClip={this.addClip}
                keyRef={(keyEl) => { this.keyRef = keyEl; }}
                valueRef={(valueEl) => { this.valueRef = valueEl; }}
                clipKeys={this.props.clips.map((clip) => clip.key)}
            />;
        } else {
            return <SearchControl
                searchVal={this.props.search || ''}
                onKeyUp={this.handleSearchKeyUp}
                onChange={this.updateSearch}
                searchRef={(searchEl) => { this.searchRef = searchEl; }}
            />;
        }
    }
}

function mapStateToProps(state) {
    return {
        mode: state.mode,
        search: state.search,
        focus: state.focus,
        clips: state.clips
    };
}

export default connect(mapStateToProps)(ControlBar);