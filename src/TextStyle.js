import React from 'react';
import "./App.css";

export function SmallText({text, color}) {
    return (
        <span className='small-text' style={{color: color}}>{text}</span>
    );
}

export function SmallTextBold({text, color}) {
    return (
        <span className='small-text-bold' style={{color: color}}>{text}</span>
    );
}

export function MainScreenTemp({text, color}) {
    return (
        <span className='main-screen-temp' style={{color: color}}>{text}</span>
    );
}