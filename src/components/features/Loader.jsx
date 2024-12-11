import React from 'react';
import { Color } from '../../assets/color';
import '../../assets/styles/loader.css';

const Loader = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '250px' }}>
            <div style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '2rem', height: '2rem', backgroundColor: Color.primary, borderRadius: '9999px', animation: 'snake 1s infinite' }}></div>
                <div style={{ width: '2rem', height: '2rem', backgroundColor: Color.primary, borderRadius: '9999px', animation: 'snake 1s infinite', animationDelay: '0.2s' }}></div>
                <div style={{ width: '2rem', height: '2rem', backgroundColor: Color.primary, borderRadius: '9999px', animation: 'snake 1s infinite', animationDelay: '0.4s' }}></div>
            </div>
        </div>
    );
}

export default Loader;
