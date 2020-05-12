import React from 'react';
import "./DropdownMenu.scss";

const DropdownMenu = (props) => {
   
    return (<ul className="dropdown">
                {props.children}
    </ul>);
}

export default DropdownMenu