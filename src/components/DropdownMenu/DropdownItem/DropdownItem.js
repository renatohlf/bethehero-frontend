import React from 'react';
import { Link } from "react-router-dom";
import "./DropdownItem.scss";

const DropdownItem = (props) => {
    return (
        <li className="dropdown-item__menu-item" onClick={props.onClick}>
            <Link className="dropdown-item__link" to={props.to}>
                <>
                    <span className="dropdown-item__icon-button">{props.leftIcon}</span>
                        {props.children}
                    <span className="dropdown-item__icon-right">{props.rightIcon}</span>
                </>
             </Link>

   </li> );
};

export default DropdownItem;