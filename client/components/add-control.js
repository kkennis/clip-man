const React = require('react');
const keycodes = require('../constants/keycodes')

class AddControl extends React.Component {
    state = { key: null, value: null };

    componentWillMount() {
        this.setState({ key: null, value: null });
    }

    updateForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onKeyUp = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.SUBMIT_FORM) {
            this.props.addClip(this.state);
        } else {
            this.props.onKeyUp(event);
        }
    }

    render() {
        return (
            <div class='add-item' onKeyUp={this.onKeyUp}>
                <input
                    id='new-key-input'
                    type='text'
                    placeholder='Key'
                    name='key'
                    value={this.state.key}
                    onChange={this.updateForm}
                />
                <textarea
                    id='new-val-input'
                    rows='3'
                    placeholder='Value'
                    name='value'
                    value={this.state.value}
                    onChange={this.updateForm}
                />
            </div>
        );
    }
}


module.exports = AddControl;