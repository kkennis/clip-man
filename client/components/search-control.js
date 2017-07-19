const React = require('react');

const SearchControl = ({ searchVal, onUpdate, onToggleAdd }) => (
    <div className='input-line'>
        <input id='key-input' type='text' value={searchVal} onKeyUp={onUpdate} />
        <span className='add-val' onClick={onToggleAdd}>&plus;</span>
    </div>
);

module.exports = SearchControl;