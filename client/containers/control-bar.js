const React = require('react');
const { connect } = require('react-redux');
const { updateSearch, goToAdd, goToSearch, moveFocusDown } = require('../actions');
const keycodes = require('../constants/keycodes');
const AddControl = require('../components/add-control');
const SearchControl = require('../components/search-control');


class ControlBar extends React.Component {
    componentDidMount() {
        this._doFocus();
    }

    componentDidUpdate() {
        this._doFocus();
    }

    _doFocus() {
        if (this.props.focus === null) {
            this.searchRef.focus();
        }
    }

    handleSearchKeyUp = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.ADD) {
            this.props.dispatch(goToAdd());
        } else if (event.keyCode === keycodes.TOGGLE_DOWN) {
            this.props.dispatch(moveFocusDown());
        } else {
            console.log('Updating!!')
            this.updateSearch(event);
        }
    }

    updateSearch = (event) => {
        const searchStr = event.target.value;
        console.log('Dis str', searchStr);
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
                searchVal={this.props.search || ''}
                onKeyUp={this.handleSearchKeyUp}
                searchRef={(searchEl) => { this.searchRef = searchEl; }}
            />;
        }
    }
}

function mapStateToProps(state) {
    return {
        mode: state.mode,
        search: state.search,
        focus: state.focus
    };
}

module.exports = connect(mapStateToProps)(ControlBar);