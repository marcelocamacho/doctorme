'use client';
import ReactDOM from "react-dom";

export function PreloadResource(){
    ReactDOM.preload('./sprinte.svg',{
        as: 'image',
    });
    return null;
}