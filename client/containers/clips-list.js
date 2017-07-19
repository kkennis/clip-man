const React = require('react');
const Clip = require('../components/clip');
const { loadClips } = require('../actions');

class ClipsList extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadClips());
    }

    render() {
        if (this.props.clips.length === 0) {
            return (
                <div className='clip-container'>
                    <h4 className='no-clips'>No clips yet. Add some!</h4>
                </div>
            );
        } else {
            return this.props.clips.map((clip) => <Clip clip={clip} />);
        }
    }
}

function mapStateToProps(state) {
    const clips = state.search ?
        state.clips.filter((clip) => clip.key.match(state.search))
        : state.clips;

    return {
        clips: clips
    };
};

module.exports = connect(mapStateToProps)(ClipsList);
