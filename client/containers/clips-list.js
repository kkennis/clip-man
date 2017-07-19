const React = require('react');
const { connect } = require('react-redux');
const Clip = require('../components/clip');
const { loadClips, goToAdd, goToSearch, moveFocusDown, moveFocusUp, removeClip } = require('../actions');
const keycodes = require('../constants/keycodes')

class ClipsList extends React.Component {
    clipRefs = [];

    componentWillMount() {
        this.props.dispatch(loadClips());
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
            }
        } else {
            if (event.keyCode === keycodes.COPY_CLIP) {
                // need to do actual copying here
                // doCopy();
            } else if (event.keyCode === keycodes.TOGGLE_DOWN && this.props.focus < this.clipRefs.length - 1) {
                this.props.dispatch(moveFocusDown());
            } else if (event.keyCode === keycodes.TOGGLE_UP) {
                this.props.dispatch(moveFocusUp());
            } else if (event.keyCode === keycodes.GO_BACK) {
                this.props.dispatch(goToSearch());
            }

        }
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

module.exports = connect(mapStateToProps)(ClipsList);
