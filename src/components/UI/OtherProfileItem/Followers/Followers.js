import React from "react";
import Aux from './../../../../hoc/Auxilary';
import './Followers.css';
import logo from "../../Createpost/images/pic.png";
import {Link} from "react-router-dom";

const followers = props =>{
    return(
        <Aux>
            <Link to={'/empty/'+props.name}>
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
                                    <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold", color:"black"}}><br/>{props.name}<br/><span
                                        style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{props.email}</span>
                                    </p>

                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </Link>
        </Aux>
    );
}

export default followers;