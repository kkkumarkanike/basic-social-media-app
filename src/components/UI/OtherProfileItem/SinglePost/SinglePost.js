import React from "react";
import Aux from './../../../../hoc/Auxilary';
import './SinglePost.css';
import logo from "../../Createpost/images/pic.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faHeart, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const singlePost = props =>{
    return(
        <Aux>
            <div className="posts-block">
            <div className="title">
                <ul>
                    <li>
                        <div className="profile-pic">
                            <img src={logo} className="pic-size" alt="logo"/>
                        </div>
                    </li>
                    <li>
                        <div className="name">
                            <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{props.itemList.name}<br/><span
                                    style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{props.itemList.email}</span>
                            </p>

                        </div>
                    </li>
                    <li style={{float : "right", marginRight : "40px"}}>
                        <p style={{color : "palevioletred"}}><FontAwesomeIcon icon={faTrashAlt}/></p>
                    </li>
                </ul>
            </div>
            <div className="message">
                <p>{props.itemList.message}</p>
            </div>
            <div className="accomplishments">
                <div className="love">
                    <FontAwesomeIcon icon={faHeart} style={{color: "palevioletred", fontSize : "20px"}}/>
                    <div className="notifications"><p  style={{fontSize : "12px", marginTop : "2px", marginRight : "1px"}}>{props.itemList.likes}</p></div>
                </div>
                <div className="mess">
                    <FontAwesomeIcon icon={faEnvelope} style={{color: "#73f1d1", fontSize : "20px"}}/>
                    <div className="notifications"><p  style={{fontSize : "12px", marginTop : "2px", marginRight : "1px"}}>{props.itemList.comments.length}</p></div>
                </div>
            </div>

            <div className="comments-section">

                {/*<div className="title">*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <div className="profile-pic">*/}
                {/*                <img src="./images/pic.png" className="pic-size" alt=""/>*/}
                {/*            </div>*/}
                {/*        </li>*/}
                {/*        <li><br/>*/}
                {/*            <input className="inp" type="text" placeholder="Add comments*" width="100%"/>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

                {/*<div className="commentors">*/}
                {/*    <div className="title">*/}
                {/*        <ul>*/}
                {/*            <li>*/}
                {/*                <div className="profile-pic">*/}
                {/*                    <img src="./images/pic.png" className="pic-size" alt=""/>*/}
                {/*                </div>*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <p><u>pname</u><br/>Message<br/>date</p>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            </div>
            <br/>
        </Aux>
    );
}

export default singlePost;