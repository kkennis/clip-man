import React from 'react';

export default () => (
    <div>
        <h3>Help</h3>
        <h4>When Searching</h4>
        <ul>
            <li><strong>Type</strong> to filter the list of clips.</li>
            <li>Press <strong>Down</strong> to start scrolling through clips. Best used after typing in a filter.</li>
            <li>Press <strong>Ctrl+N</strong> to begin adding a new clip.</li>
        </ul>
        <h4>When Adding</h4>
        <ul>
            <li><strong>Type</strong> to complete the required fields.</li>
            <li>Press <strong>Tab</strong> to switch between the 'Key' and 'Value' inputs.</li>
            <li>Press <strong>Ctrl+Enter</strong> to save the new clip.</li>
        </ul>
        <h4>When Browsing</h4>
        <ul>
            <li>Press <strong>Up</strong> and <strong>Down</strong> to navigate through the list of clips.</li>
            <li>Press <strong>Enter</strong> to copy the clip to your clipboard and hide the Clip Man window.</li>
            <li>Press <strong>Ctrl+D</strong> to delete the highlighted clip.</li>
            <li>Press <strong>Ctrl+S</strong> to jump back to search.</li>
        </ul>
        <h4>Global</h4>
        <ul>
            <li>Press <strong>Ctrl+H</strong> to toggle this help menu.</li>
            <li>Press <strong>Esc</strong> to go back. When searching, this will hide the Clip Man window.</li>
            <li>Press <strong>Ctrl+Q</strong> to quit the application.</li>
        </ul>
    </div>
);

