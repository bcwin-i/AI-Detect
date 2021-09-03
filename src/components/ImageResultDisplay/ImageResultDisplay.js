import React from 'react';
//import './imageresultdisplay.css';

const ImageResultDisplay = ({name, entries}) => {
    console.log('user details', name)
    return (
        <div style={{color: 'white'}}>
            <div>
                {`${name}, your current rank is #${entries}`}
            </div>
        </div>
    )
}

export default ImageResultDisplay;