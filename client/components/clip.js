import React from 'react';

export default ({ clip, clipRef }) => (
    <div className='item' tabIndex='0' id={`clip-${clip._id}`} ref={clipRef}>
        <h4 className='item-header'>{clip.key}</h4>
        <p className='item-value'>{clip.value}</p>
    </div>
);
