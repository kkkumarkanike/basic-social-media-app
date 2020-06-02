import React from "react";
import './HambergerNav.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const hambergerNav = props =>{
    return (
        <div>
            <nav id="barNav" className="barNavigation">
                <ul>
                    <li  style={{fontSize: '20px'}}><Link to="/" className="link-style"><b><FontAwesomeIcon icon={faShareAlt}/>&nbsp;FC</b></Link></li>
                    <li style={{float : "right"}} onClick={props.clicked}>
                        <div style={{width : '22px', height : '4px',backgroundColor:'white',marginTop:'5px'}}></div>
                        <div style={{width : '22px', height : '4px',backgroundColor:'white',marginTop : '3px'}}></div>
                        <div style={{width : '22px', height : '4px',backgroundColor:'white',marginTop : '4px'}}></div>
                    </li>
                </ul>
            </nav>
        </div>
    );

}

export default hambergerNav;