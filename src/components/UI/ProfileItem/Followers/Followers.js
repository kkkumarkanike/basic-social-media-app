import React from "react";
import Aux from './../../../../hoc/Auxilary';
import './Followers.css';
import logo from "../pic.png";
import {Link} from "react-router-dom";

const followers = props =>{
    return(
        <Aux>
            <div className="posts-block" style={{marginBottom : "8px", marginLeft : "2px", marginRight : "2px"}}>
            <div className="title">
                <ul>
                    <li>
                        <div className="profile-pic">
                            <img src={logo} className="pic-size" alt=""/>
                        </div>
                    </li>
                    <li>
                        <div className="name">
                            <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{props.name}<br/><span
                                    style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{props.email}</span>
                            </p>

                        </div>
                    </li>
                    <li className="unfollow-position">
                        <Link to={'/empty/'+ props.name}><p><button className="view-details" style={{color:"white"}}>VIEW PROFILE</button></p></Link>
                    </li>
                </ul>
            </div>
            </div>
        </Aux>
    );
}

export default followers;