'use client';
import ReactDOM from "react-dom";

export function PreloadResource(){
    ReactDOM.preload('./sprite.svg',{
        as: 'image',
    });
    return null;
}