const React = require('react');

class AddControl extends React.Component {
    state = { key: null, value: null };

    componentWillMount() {
        this.setState({ key: null, value: null });
    }

    updateForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div class='add-item'>
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