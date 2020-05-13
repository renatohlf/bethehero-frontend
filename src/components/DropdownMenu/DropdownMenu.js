import React from 'react';
import "./DropdownMenu.scss";

const DropdownMenu = (props) => {
   
    return (
        <>
            <div className="dropdown-arrow" />
            <ul className="dropdown">    
                {props.children}
            </ul>
    </>);
}

export default DropdownMenu