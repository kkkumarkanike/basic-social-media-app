import React, {Component} from "react";
import Aux from './../../hoc/Auxilary';
import Layout from "../../hoc/Layout";
import axios from "axios";
import './Comments.css';
import Comment from './Comment/Comment';
import logo from "./pic.png";
import {Link} from "react-router-dom";

class Comments extends Component{
    state = {
        comments : []
    }
    componentDidMount() {
        console.log('current props',this.props);
        const postId = this.props.match.params.id;
        axios.get('https://sample-social-media.firebaseio.com/posts.json')
            .then(res =>{
                const data = res.data;
                const requiredPost = Object.keys(data).filter(item => data[item].postId === postId);
                console.log('Required Post',data[requiredPost[0]]);
                const finalCommentsList = data[requiredPost[0]].comments.filter(item => item.name !== "kkk" && item.message !== "Hi");
                console.log('Required Post Comments',finalCommentsList);
                this.setState({comments : finalCommentsList});
            })
            .catch(error =>{
                console.log(error);
            });
    }

    render() {
        const id = this.props.match.params.id;
        let comments = null;
        comments = this.state.comments.length > 0 ? this.state.comments.map(item =>{
             return (
                 <div className="posts-block" style={{marginBottom : "10px"}}>

                     <div className="title">
                         <ul>
                             <li>
                                 <div className="profile-pic">
                                     <img src={logo} className="pic-size" alt=""/>
                                 </div>
                             </li>
                             <li>
                                 <div className="name">
                                     <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{item.name}<br/><span
                                         style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}></span>
                                     </p>

                                 </div>
                             </li>
                         </ul>
                     </div>
                     <div className="message">
                         <p>{item.message}</p>
                     </div>

                 </div>
             );
         }) : <center><p>No one is commented yet...</p></center>;
        return (
            <Aux>
                <Layout/>
                <div className="distance"><br/><br/><br/><br/></div>
                <div className="mobile-distance"><br/><br/><br/></div>
                <div className="">
                    <h4 style={{textAlign: "center"}}>Your Post</h4>
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
                                        <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>Kalyan
                                            Kumar<br/><span
                                                style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>kkalyan812@gmail.com</span>
                                        </p>

                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="message">
                            <p>Hi message</p>
                        </div>

                    </div>
                </div>
                <h4 style={{textAlign: "center"}}>Comments for this post</h4>
                {comments}
            </Aux>
        );
    }
}

export default Comments;