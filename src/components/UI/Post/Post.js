import React, {useState} from "react";
import logo from './pic.png';
import './Post.css';
import './other.css';
// import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelopeSquare, faHeart, faPager} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
const post = (props) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state,setState] = useState('');
    const inputHandler = (event) =>{
        setState(event.target.value);
        console.log(props.name);
        console.log(props.user);
    }
    return(
        <div>
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
                                <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{props.name}<br/><span
                                        style={{color:" #aaa",fontSize: "11px",fontWeight: "lighter"}}>{props.email}</span>
                                </p>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="message">
                    <p style={{paddingLeft: "5px"}}>{props.message}</p>
                    {/*<p>{props.itemsList}</p>*/}
                </div>
                <div className="accomplishments">
                       <div className="heart-box">
                           <div className="heart" onClick={() => props.click(props.itemName,props.itemsList, props.likes)}><FontAwesomeIcon icon={faHeart}/></div>
                       </div>
                    {/*<div className="mess">*/}
                    {/*    <div className="notifications">0</div>*/}
                    {/*</div>*/}
                </div>

                <div className="comments-section" >
                    <div className="title">
                        <ul style={{padding : "0px", margin : 0}}>
                            <li>
                                <div className="profile-pic">
                                    <img src={logo} className="pic-size" alt=""/>
                                </div>
                            </li>
                            <li><br/>
                                <input name="comment" value={state} onChange={inputHandler} type="text" placeholder="Add comment*"
                                       width="100%" />
                            </li>
                            <li id="li-button" style={{float: "right",paddingRight: "5px",paddingTop: "8px"}}>
                                <button className="post_button" onClick={() => {
                                    props.click2(props.user,state, props.comments,props.itemsList, props.itemName);
                                    setState('');
                                }}>POST</button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <br/>
        </div>
    );
}


export default post;