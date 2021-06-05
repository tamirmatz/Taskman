// export function Overlay({onClick}){
//     return <div onClick={onClick} className="base-overlay max-screen2"></div>
// }
import React from 'react'

export function Overlay({ onClick, children }) {
    // const overlayHeight =document.querySelector('.base-overlay').clientHeight
    return <div
        className="base-overlay max-screen2"
        onClick={onClick}
    >
        {children}
    </div>
}