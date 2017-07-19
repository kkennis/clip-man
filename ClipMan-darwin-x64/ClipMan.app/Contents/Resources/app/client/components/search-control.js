const React = require('react');

const SearchControl = ({ searchVal, onKeyUp, onToggleAdd }) => (
    <div className='input-line'>
        <input id='key-input' type='text' value={searchVal} onKeyUp={onKeyUp} />
        <span className='add-val' onClick={onToggleAdd}>&plus;</span>
    </div>
);

module.exports = SearchControl;