import React from "react";
import Aux from './../../../hoc/Auxilary';
import logo from "../pic.png";
import {Link} from "react-router-dom";
import './Comment.css';

const comment = props =>{
    return(
        <Aux>
            <div className="posts-block">
                <div className="title">
                    <ul>
                        <li>
                            <div className="profile-pic">
                                <img src={logo} className="pic-size" alt=""/>
                            </div>
                        </li>
                        <li>
                            <div className="name">
                                <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>Name<br/><span
                                    style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>Message</span>
                                </p>

                            </div>
                        </li>
                        <li className="unfollow-position">
                            <Link to={'/empty/'+ props.name}><p></p></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Aux>
    );
}

export default comment;