const React = require('react');
const { connect } = require('react-redux');
const { updateSearch, goToAdd, goToSearch, moveFocusDown } = require('../actions');
const keycodes = require('../constants/keycodes')

class ControlBar extends React.Component {
    goToAdd = () => {
        this.props.dispatch(goToAdd());
    }

    handleSearchKeyUp = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.ADD) {
            this.props.dispatch(goToAdd());
        } else if (event.keyCode === keycodes.TOGGLE_DOWN) {
            this.props.dispatch(moveFocusDown());
        } else {
            this.updateSearch(event);
        }
    }

    updateSearch = (event) => {
        const searchStr = event.target.value;
        this.props.dispatch(updateSearch(searchStr));
    }

    handleAddKeyUp = (event) => {
        if (event.keyCode === keycodes.GO_BACK) {
            this.props.dispatch(goToSearch());
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
            />;
        } else {
            return <SearchControl
                searchVal={this.props.search}
                onKeyUp={this.handleSearchKeyUp}
                onToggleAdd={this.goToAdd}
            />;
        }
    }
}

function mapStateToProps(state) {
    return {
        mode: state.mode,
        search: state.search
    };
}

module.exports = connect(mapStateToProps)(ControlBar);