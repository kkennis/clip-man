import React, { Component } from 'react';
import ControlBar from '../containers/control-bar';
import ClipsList from '../containers/clips-list';
import keycodes from '../constants/keycodes';
import Help from './help';

export default class App extends Component {
    state = { view: 'app' };

    componentDidUpdate() {
        if (this.state.view === 'help') {
            this.helpDiv.focus();
        }
    }

    goToHelp = () => {
        this.setState({ view: 'help' })
    }

    goToApp = () => {
        this.setState({ view: 'app' })
    }


    watchHelpHotkey = (event) => {
        if (event.ctrlKey && event.keyCode === keycodes.HELP) {
            this.state.view === 'app' ? this.goToHelp() : this.goToApp();
        } else if (this.state.view === 'help' && event.keyCode === keycodes.GO_BACK) {
            this.goToApp();
        }
    }


    render() {
        if (this.state.view === 'app') {
            return (
                <div className='app-container' onKeyDown={this.watchHelpHotkey}>
                    <ControlBar />
                    <ClipsList />
                    <div className='help-toggle-icon' onClick={this.goToHelp}>?</div>
                </div>
            );
        } else {
            return (
                <div className='app-container' tabIndex='1' onKeyDown={this.watchHelpHotkey} ref={(helpDiv) => { this.helpDiv = helpDiv; }}>
                    <Help />
                    <div className='help-toggle-icon' onClick={this.goToApp}>⟲</div>
                </div>
            )
        }
    }
}
