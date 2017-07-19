const React = require('react');

const SearchControl = ({ searchVal, onKeyUp, onToggleAdd, searchRef }) => (
    <div className='input-line'>
        <input
            id='key-input'
            type='text'
            value={searchVal}
            onKeyUp={onKeyUp}
            ref={searchRef}
        />
    </div>
);

module.exports = SearchControl;