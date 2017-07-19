const React = require('react');
const ControlBar = require('../containers/control-bar');
const ClipsList = require('../containers/clips-list');

const App = () => (
    <div>
        <ControlBar />
        <ClipsList />
    </div>
);

module.exports = App;