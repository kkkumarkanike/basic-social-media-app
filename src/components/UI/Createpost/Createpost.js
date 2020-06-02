import React from "react";
import './Createpost.css';
import axios from "axios";
import {connect} from "react-redux";
import {postCreate} from './../../../store/actions/index';
import logo from './images/pic.png';
import {Redirect, Router} from "react-router";
// import {postCreationFail, postCreationSuccess} from "../../../store/actions/actions";

class Createpost extends React.Component{
    componentDidMount() {
        console.log('posts',this.props.posts);
    }

    render() {
        return (
            <div className="space">
                <div className="singlepost">
                    {/*<div style={{backgroundColor : "red" , padding : "20px"}}></div>*/}
                    <div className="posts-block">
                        <div className="title">
                            <ul>
                                <li>
                                    <div className="profile-pic">
                                        <img src={logo} className="pic-size" alt="image" />
                                    </div>
                                </li>
                                <li>
                                    <div className="name">
                                        <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{this.props.email.split('@')[0]}<br/><span
                                                style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{this.props.email}</span>
                                        </p>

                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="message">
                            <p style={{paddingLeft: "5px",color: "#aaaaaa"}}>Add a status</p>
                            <textarea name="" id="" cols="30" rows="5" placeholder="what's on your mind?" onChange={this.props.changed}></textarea>
                            <br/><br/>
                        </div>
                        <div className="comments-section">
                            <div className="title">
                                <ul>
                                    <li>
                                        <div className="profile-pic">
                                            <br/><br/>
                                        </div>
                                    </li>
                                    <li style={{float: "right",paddingRight: "20px",paddingTop: "13px"}}>
                                        <button className="post_button" onClick={this.props.click}>POST</button>
                                    </li>
                                </ul><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
const mapStateToProps = state =>{
    return {
        token : state.token,
        email : state.email,
        userId : state.userId,
        posts : state.posts
    }
}

export default connect(mapStateToProps)(Createpost);