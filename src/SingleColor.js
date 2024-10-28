import React, { useState } from 'react';
import rgbToHex from './utils';

export default function SingleColor({ rgb, weight, index }) {
    const [alert, setAlert] = useState(false);

    const bcg = rgb.join(',');
    const hex = rgbToHex(...rgb);

    const handleCopy = (colorCode) => {
        navigator.clipboard.writeText(colorCode);
        setAlert(true);
        let copyTimer = setInterval(() => {
            setAlert(false);
        }, 1500);
        return () => clearInterval(copyTimer);
    }

    return (
        <div className={`color-box`} style={{ backgroundColor: `rgb(${bcg})` }}>
            <div className={`txt dark-color ${index > 8 && 'light-color'}`} >
                <p>{weight}%</p>
                <p onClick={() => handleCopy(hex)} title='Click to Copy' className='copy'>{hex}</p>
                {alert && <span>Copy to Clipboard</span>}
            </div>
        </div>
    )
}
