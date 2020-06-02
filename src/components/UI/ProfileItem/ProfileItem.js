import React, {Component} from "react";
import Aux from './../../../hoc/Auxilary';
import './ProfileItem.css';
import logo from './pic.png';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faEnvelopeOpen, faHeart, faPenAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import SinglePost from './SinglePost/SinglePost';
import Following from './Following/Following';
import Followers from './Followers/Followers';
import axios from "axios";
import MainSpinner from './../../UI/MainSpinner/MainSpinner';

class ProfileItem extends Component {
    state = {
        componentLoad : true,
        component : null,
        posts : {},
        following : [],
        followers : []
    }
    componentDidMount() {
        // console.log(this.props.token);
        console.log('this page posts',this.state.posts);
        axios.get('https://sample-social-media.firebaseio.com/posts.json?auth=' + this.props.token)
            .then(res =>{
                // console.log(res.data);
                const obj = res.data;
                Object.filter = (obj, predicate) =>
                    Object.keys(obj)
                        .filter( key => predicate(obj[key].email) )
                        .reduce( (res, key) => (res[key] = obj[key], res), {} );

                const filtered = Object.filter(obj, key => key === this.props.email);
                console.log('Filtered posts',filtered);
                this.setState({posts : filtered});
                console.log('Current user posts',this.state.posts);
            })
            .catch(error =>{
                console.log(error);
            });
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res =>{
                // console.log('Resultant data',res.data);
                const resObj = res.data;
                const currentUserFollowing = Object.keys(resObj).filter(item => resObj[item].email === this.props.email);
                console.log("Filteres Data",resObj[currentUserFollowing[0]]);
                const followingList = resObj[currentUserFollowing[0]].following;
                if (resObj[currentUserFollowing[0]].following){
                    this.setState({following : followingList});
                    console.log('Current User Following List',followingList);
                }else{
                    console.log('create following');

                }
            })
            .catch(error =>{
                console.log(error);
            });
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res =>{
                // console.log('Resultant data',res.data);
                const resObj = res.data;
                const currentUserFollowers = Object.keys(resObj).filter(item => resObj[item].email === this.props.email);
                console.log("Filteres Data",resObj[currentUserFollowers[0]]);
                const followersList = resObj[currentUserFollowers[0]].followers;
                if (resObj[currentUserFollowers[0]].followers){
                    this.setState({followers : followersList});
                    console.log('Current User Followers List',followersList);
                }else{
                    console.log('create followers');

                }
            })
            .catch(error =>{
                console.log(error);
            });
    }
    postDeleteHandler = (id) =>{
        console.log(id);
        axios.get('https://sample-social-media.firebaseio.com/posts.json')
            .then(res =>{
                const posts = res.data;
                const deleteObject = Object.keys(posts).filter(item => posts[item].postId === id);
                axios.put('https://sample-social-media.firebaseio.com/posts/'+ deleteObject[0] +'.json',{})
                    .then(res =>{
                        console.log('deleted successfully');
                        Object.filter = (obj, predicate) =>
                            Object.keys(obj)
                                .filter( key => predicate(obj[key].postId) )
                                .reduce( (res, key) => (res[key] = obj[key], res), {} );

                        const filtered = Object.filter(this.state.posts, key => key !== id);
                        this.setState({posts : filtered});
                        console.log('Current user posts after Deleting one post',this.state.posts);
                    })
                    .catch(error =>{
                        console.log(error);
                    })
            })
            .catch(error =>{
                console.log(error);
            })

    }
    componentHandler = (componentType) =>{
        this.setState({component : componentType});
    }

    unFollowHandler = (otherMail) =>{
        const myEmail = this.props.email;
        const otherEmail = otherMail;
        // const updatedFollowers = this.state.following.filter(item => item.email !== this.props.email);
        const updatedFollowing = this.state.following.filter(item => item.email !== otherEmail);
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res => {
                const data = res.data;
                const myId = Object.keys(data).filter(item => data[item].email === myEmail);
                const otherId = Object.keys(data).filter(item => data[item].email === otherEmail);
                const updatedOtherUserFollowers = data[otherId[0]].followers.filter(item => item.email !== myEmail);
                const updatedOtherData = {
                    ...data[otherId[0]],
                    followers : updatedOtherUserFollowers
                }
                const updatedMyData = {
                    ...data[myId[0]],
                    following: updatedFollowing
                }
                axios.put('https://sample-social-media.firebaseio.com/users/'+ myId[0] +'.json', updatedMyData)
                            .then(res =>{
                                console.log('Follower Deleted');
                                this.setState({following : updatedFollowing});
                                console.log(updatedFollowing)
                            })
                            .catch(error =>{
                                console.log(error);
                            });
                axios.put('https://sample-social-media.firebaseio.com/users/'+ otherId[0] +'.json', updatedOtherData)
                    .then(res =>{
                        console.log(updatedOtherData)
                    })
                    .catch(error =>{
                        console.log(error);
                    });

            })
            .catch(error =>{
                console.log(error);
            })
        //         const updatedUserData = {
        //             ...data[userId[0]],
        //             followers : updatedFollowers
        //         }
        //         axios.put('https://sample-social-media.firebaseio.com/users/'+ userId[0] +'.json', updatedUserData)
        //             .then(res =>{
        //                 console.log('Follower Deleted');
        //                 this.setState({followers : updatedFollowers});
        //             })
        //             .catch(error =>{
        //                 console.log(error);
        //             });
        //         axios.put('https://sample-social-media.firebaseio.com/users/'+ myId[0] +'.json', updatedMyData)
        //             .then(res =>{
        //                 console.log('Follower Deleted');
        //                 this.setState({selfFollowing : updatedFollowing});
        //             })
        //             .catch(error =>{
        //                 console.log(error);
        //             });
        //
        //     })
        //     .catch(error =>{
        //         console.log(error);
        //     })


    }
    render() {
        let component = <MainSpinner/>;
        // console.log('Posts array',Object.keys(this.state.posts).length);
         component = Object.keys(this.state.posts).length ?
                    Object.keys(this.state.posts).map(item =>
                    {
                        return <SinglePost itemList={this.state.posts[item]} delete={this.postDeleteHandler}/>
                    }) : <p style={{textAlign : "center"}}>No posts found</p>;



        if (this.state.component === "posts"){
            component = Object.keys(this.state.posts).length ?
                Object.keys(this.state.posts).map(item =>
                {
                    return <SinglePost itemList={this.state.posts[item]} delete={this.postDeleteHandler}/>
                }) : <p style={{textAlign : "center"}}>No posts found</p>;

        }
        if (this.state.component === "following"){
            component = this.state.following.length ?
               this.state.following.map(item =>
                {
                    return <Following name={item.name} email={item.email} click={this.unFollowHandler}/>;
                }) : <p style={{textAlign : "center"}}>You are not following anyone yet</p>;
        }
        if (this.state.component === "followers"){
            component = this.state.followers.length ?
                this.state.followers.map(item =>
                {
                    return <Followers name={item.name} email={item.email}/>;
                }) : <p style={{textAlign : "center"}}>You don't have followers yet!!</p>;
        }

        return(
            <Aux>
                <div className="profile-posts"><br/>
                    <h2 style={{padding : 0, margin : 0}}>Profile</h2>

                    <div className="name-block" style={{alignItems : "center"}}>
                        <ul>
                            <li>
                                <div className="profile-pic">
                                    <img src={logo} className="pic-size" alt=""/>
                                </div>
                            </li>
                            <li>
                                <div className="name">
                                    <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{this.props.name}<br/><span
                                            style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{this.props.email}</span>
                                    </p>

                                </div>
                            </li>
                            <li className="update-delete">
                                <p className="update"><FontAwesomeIcon icon={faPenAlt}/></p>
                                <p className="trash"><FontAwesomeIcon icon={faTrashAlt}/></p>
                            </li>
                        </ul>
                        <hr style={{
                            borderColor: "#fff",
                            width: "90%",
                            height: "0px",
                            marginTop : 0,
                            marginBottom : 0,
                            paddingBottom : 0,
                            paddingTop : 0
                        }}/>
                    </div>
                    <p id="date" className="date">This is date</p>

                    <div className="tabs" >
                        <ul>
                            <li className="item posts" onClick={() => this.componentHandler('posts')}>POSTS</li>
                            <li className="item following" onClick={() => this.componentHandler('following')}> FOLLOWING</li>
                            <li className="item followers" onClick={() => this.componentHandler('followers')}>FOLLOWERS</li>
                        </ul>
                    </div>
                    {component}
                    <br/>

                    {/*<div className="posts-block">*/}
                        {/*    <div className="title">*/}
                        {/*        <ul>*/}
                        {/*            <li>*/}
                        {/*                <div className="profile-pic">*/}
                        {/*                    <img src={logo} className="pic-size" alt=""/>*/}
                        {/*                </div>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <div className="name">*/}
                        {/*                    <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>Kalyan*/}
                        {/*                        Kumar<br/><span*/}
                        {/*                            style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>kkalyan812@gmail.com</span>*/}
                        {/*                    </p>*/}

                        {/*                </div>*/}
                        {/*            </li>*/}
                        {/*            <li style={{float : "right", marginRight : "40px"}}>*/}
                        {/*                <p style={{color : "palevioletred"}}><FontAwesomeIcon icon={faTrashAlt}/></p>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*    <div className="message">*/}
                        {/*        <p>Hi message</p>*/}
                        {/*    </div>*/}
                        {/*    <div className="accomplishments">*/}
                        {/*        <div className="love">*/}
                        {/*            <FontAwesomeIcon icon={faHeart} style={{color: "palevioletred", fontSize : "20px"}}/>*/}
                        {/*            <div className="notifications"><p  style={{fontSize : "12px", marginTop : "2px", marginRight : "1px"}}>1</p></div>*/}
                        {/*        </div>*/}
                        {/*        <div className="mess">*/}
                        {/*            <FontAwesomeIcon icon={faEnvelope} style={{color: "#73f1d1", fontSize : "20px"}}/>*/}
                        {/*            <div className="notifications"><p  style={{fontSize : "12px", marginTop : "2px", marginRight : "1px"}}>1</p></div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div className="comments-section">*/}

                        {/*        /!*<div className="title">*!/*/}
                        {/*        /!*    <ul>*!/*/}
                        {/*        /!*        <li>*!/*/}
                        {/*        /!*            <div className="profile-pic">*!/*/}
                        {/*        /!*                <img src="./images/pic.png" className="pic-size" alt=""/>*!/*/}
                        {/*        /!*            </div>*!/*/}
                        {/*        /!*        </li>*!/*/}
                        {/*        /!*        <li><br/>*!/*/}
                        {/*        /!*            <input className="inp" type="text" placeholder="Add comments*" width="100%"/>*!/*/}
                        {/*        /!*        </li>*!/*/}
                        {/*        /!*    </ul>*!/*/}
                        {/*        /!*</div>*!/*/}

                        {/*        /!*<div className="commentors">*!/*/}
                        {/*        /!*    <div className="title">*!/*/}
                        {/*        /!*        <ul>*!/*/}
                        {/*        /!*            <li>*!/*/}
                        {/*        /!*                <div className="profile-pic">*!/*/}
                        {/*        /!*                    <img src="./images/pic.png" className="pic-size" alt=""/>*!/*/}
                        {/*        /!*                </div>*!/*/}
                        {/*        /!*            </li>*!/*/}
                        {/*        /!*            <li>*!/*/}
                        {/*        /!*                <p><u>pname</u><br/>Message<br/>date</p>*!/*/}
                        {/*        /!*            </li>*!/*/}
                        {/*        /!*        </ul>*!/*/}
                        {/*        /!*    </div>*!/*/}
                        {/*        /!*</div>*!/*/}
                        {/*    </div>*/}




                        {/*<div className="title">*/}
                        {/*            <ul>*/}
                        {/*                <li>*/}
                        {/*                    <div className="profile-pic">*/}
                        {/*                        <img src={logo} className="pic-size" alt=""/>*/}
                        {/*                    </div>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <div className="name">*/}
                        {/*                        <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>Kalyan*/}
                        {/*                            Kumar<br/><span*/}
                        {/*                                style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>kkalyan812@gmail.com</span>*/}
                        {/*                        </p>*/}

                        {/*                    </div>*/}
                        {/*                </li>*/}
                        {/*                <li className="unfollow-position">*/}
                        {/*                    <p><button className="unfollow">UNFOLLOW</button></p>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*</div>*/}


                    {/*    <div className="title">*/}
                    {/*        <ul>*/}
                    {/*            <li>*/}
                    {/*                <div className="profile-pic">*/}
                    {/*                    <img src={logo} className="pic-size" alt=""/>*/}
                    {/*                </div>*/}
                    {/*            </li>*/}
                    {/*            <li>*/}
                    {/*                <div className="name">*/}
                    {/*                    <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>Kalyan*/}
                    {/*                        Kumar<br/><span*/}
                    {/*                            style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>kkalyan812@gmail.com</span>*/}
                    {/*                    </p>*/}

                    {/*                </div>*/}
                    {/*            </li>*/}
                    {/*            <li className="unfollow-position">*/}
                    {/*                <p><button className="view-details">VIEW PROFILE</button></p>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<br/><br/>*/}
                </div>
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return{
        token : state.token,
        email : state.email,
        name : state.name
    }
};


export default connect(mapStateToProps)(ProfileItem);