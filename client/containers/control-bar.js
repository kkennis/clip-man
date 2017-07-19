const React = require('react');
const { connect } = require('react-redux');
const { updateSearch } = require('../actions');

class ControlBar extends React.Component {
    addClip() {

    }

    updateSearch(event) {
        const searchStr = event.target.value;
        this.props.dispatch(updateSearch(searchStr));
    }

    goToAdd() {

    }

    render() {
        if (this.props.mode === 'add') {
            return <AddControl onAdd={this.addClip} />
        } else {
            return <SearchControl
                searchVal={this.props.search}
                onUpdate={this.updateSearch}
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