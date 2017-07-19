const React = require('react');

const SearchControl = ({ searchVal, onKeyUp, onChange, searchRef }) => (
    <div className='input-line'>
        <input
            id='key-input'
            type='text'
            value={searchVal}
            onChange={onChange}
            onKeyUp={onKeyUp}
            ref={searchRef}
        />
    </div>
);

module.exports = SearchControl;