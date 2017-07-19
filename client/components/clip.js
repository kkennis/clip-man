const React = require('react');

const Clip = ({ clip, clipRef }) => (
    <div className='item' tabIndex='1' id={`clip-${clip._id}`} ref={clipRef}>
        <h4 className='item-header'>{clip.key}</h4>
        <p className='item-value'>{clip.value}</p>
    </div>
)

module.exports = Clip;