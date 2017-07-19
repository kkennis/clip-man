const React = require('react');
const keycodes = require('../constants/keycodes')

class AddControl extends React.Component {
    state = { key: '', value: '', error: null };

    componentWillMount() {
        this.setState({ key: '', value: '', error: null });
    }

    updateForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onKeyUp = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.SUBMIT_FORM) {
            const validation = this._validateInput();

            if (validation.valid) {
                this.props.addClip(this.state);
            } else {
                this.setState({ error: validation.error });
            }
        } else {
            this.props.onKeyUp(event);
        }
    }

    _validateInput = () => {
        if (!this.state.key) {
            return {
                valid: false,
                error: 'Key may not be empty.'
            }
        } else if (!this.state.value) {
            return {
                valid: false,
                error: 'Value may not be empty.'
            }
        } else if (this.props.clipKeys.includes(this.state.key)) {
            return {
                valid: false,
                error: 'Duplicate key value.'
            }
        } else {
            return {
                valid: true
            }
        }
    }

    render() {
        return (
            <div className='add-item' onKeyUp={this.onKeyUp}>
                {this.state.error &&
                    <p className='error-text'>Error: {this.state.error}</p>
                }
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