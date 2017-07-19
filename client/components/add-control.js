const React = require('react');
const keycodes = require('../constants/keycodes')

class AddControl extends React.Component {
    state = { key: '', value: '' };

    componentWillMount() {
        this.setState({ key: '', value: '' });
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
            <div className='add-item' onKeyUp={this.onKeyUp}>
                <input
                    id='new-key-input'
                    type='text'
                    placeholder='Key'
                    name='key'
                    value={this.state.key}
                    onChange={this.updateForm}
                    ref={this.props.keyRef}
                />
                <textarea
                    id='new-val-input'
                    rows='3'
                    placeholder='Value'
                    name='value'
                    value={this.state.value}
                    onChange={this.updateForm}
                    ref={this.props.valueRef}
                />
            </div>
        );
    }
}


module.exports = AddControl;