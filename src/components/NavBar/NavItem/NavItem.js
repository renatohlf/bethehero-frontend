import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import './NavItem.scss';

 const NavItem = (props) => {
    const [open, setOpen] = useState(false);

    return (<>
        <li className={"nav-item"} onClick={props.isDropdownMenu ? () => setOpen(!open) : props.onClick}>
           
           {
                 props.to && <Link className={"nav-item__icon-button"} to={props.to}> {props.icon}</Link>
            }

            {
               !props.to &&  props.icon
            }

            {
                open && props.children
            }


           
        </li>
    </>);
}

export default NavItem;