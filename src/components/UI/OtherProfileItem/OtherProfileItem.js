import React, {Component} from "react";
import Aux from './../../../hoc/Auxilary';
import './OtherProfileItem.css';
import logo from './../ProfileItem/pic.png';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope, faEnvelopeOpen, faHeart, faPenAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import SinglePost from './SinglePost/SinglePost';
import Following from './Following/Following';
import Followers from './Followers/Followers';
import axios from "axios";


class OtherProfileItem extends Component {
    state = {
        component : null,
        posts : {},
        following : [],
        followers : [],
        selfFollowing : [],
        selfFollowers : []
    }
    componentDidMount() {
        console.log('History Props',this.props.props.match.params.id);
        const name = this.props.props.match.params.id;
        const email = this.props.props.match.params.id + '@gmail.com';
        // console.log(email);
        // console.log(this.props.token);
        axios.get('https://sample-social-media.firebaseio.com/posts.json?auth=' + this.props.token)
            .then(res =>{
                // console.log(res.data);
                const obj = res.data;
                Object.filter = (obj, predicate) =>
                    Object.keys(obj)
                        .filter( key => predicate(obj[key].email) )
                        .reduce( (res, key) => (res[key] = obj[key], res), {} );

                const filtered = Object.filter(obj, key => key === email);
                // console.log('Filtered posts',filtered);
                this.setState({posts : filtered});
                // console.log(this.state.posts);
            })
            .catch(error =>{
                console.log(error);
            });
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res =>{
                // console.log('Resultant data',res.data);
                const resObj = res.data;
                const currentUserFollowing = Object.keys(resObj).filter(item => resObj[item].email === email);
                console.log("Filteres Data",resObj[currentUserFollowing[0]]);
                const followingList = resObj[currentUserFollowing[0]].following;
                if (resObj[currentUserFollowing[0]].following){
                    console.log('following ', followingList);
                    this.setState({following : followingList});
                }else{
                    this.setState({following : []})

                }
            })
            .catch(error =>{
                console.log(error);
            });
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res =>{
                // console.log('Resultant data',res.data);
                const resObj = res.data;
                const currentUserFollowers = Object.keys(resObj).filter(item => resObj[item].email === email);
                console.log("Filteres Data",resObj[currentUserFollowers[0]]);
                const followersList = resObj[currentUserFollowers[0]].followers;
                if (resObj[currentUserFollowers[0]].followers){
                    this.setState({followers : followersList});
                }else{
                    this.setState({followers : []});

                }
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
                    this.setState({selfFollowing : followingList});
                }else{
                    this.setState({selfFollowing : []})

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
                const followersList = resObj[currentUserFollowers[0]].following;
                if (resObj[currentUserFollowers[0]].followers){
                    this.setState({selfFollowers : followersList});
                }else{
                    this.setState({selfFollowers : []})

                }
            })
            .catch(error =>{
                console.log(error);
            });
    }

    componentHandler = (componentType) =>{
        this.setState({component : componentType});
    }
    followingHandler = () =>{
        const name = this.props.props.match.params.id;
        const email = this.props.props.match.params.id + '@gmail.com';

            const followerData = {
                name : this.props.name,
                email : this.props.name
            }
            axios.get('https://sample-social-media.firebaseio.com/users.json')
                .then(res => {
                    const data = res.data;
                    const followerName = Object.keys(res.data).filter(item => data[item].email === this.props.email);
                    console.log('follower Name',data[followerName[0]]);
                    const followingName = Object.keys(res.data).filter(item => data[item].email === email);
                    console.log('following Index',data[followingName[0]]);
                    if (this.state.selfFollowing.length > 0) {
                        console.log(data[followerName[0]]);
                        const followerData = {
                            ...data[followerName[0]],
                            following : [...data[followerName[0]].following ,{name : name, email : email}]
                        }
                        axios.put('https://sample-social-media.firebaseio.com/users/'+ followerName[0] +'.json', followerData)
                            .then(res =>{
                                console.log("Now you are following",name);
                                this.setState({selfFollowing : res.data.following});
                            })
                            .catch(error =>{
                                console.log(error);
                            });
                    }else{
                        const followerData = {
                            ...data[followerName[0]],
                            following : [{name : name, email : email}]
                        }
                        axios.put('https://sample-social-media.firebaseio.com/users/'+ followerName[0] +'.json', followerData)
                            .then(res =>{
                                console.log("Now you are following",name);
                                this.setState({selfFollowing : res.data.following});
                            })
                            .catch(error =>{
                                console.log(error);
                            });
                    }
                    if (this.state.followers.length > 0){
                        const followingData = {
                            ...data[followingName[0]],
                            followers : [...data[followingName[0]].followers, {name : this.props.name, email : this.props.email}]
                        };
                        console.log('Here I am');
                        console.log('For checking multiple following',followingData);
                        axios.put('https://sample-social-media.firebaseio.com/users/'+ followingName[0] +'.json', followingData)
                            .then(res =>{
                                console.log(name +'is now followed by you');
                                // const stateFollowers = [...data[followingName[0]].followers, {name : this.props.name, email : this.props.email}];
                                this.setState({followers : [...data[followingName[0]].followers, {name : this.props.name, email : this.props.email}]});

                            })
                            .catch(error =>{
                                console.log(error);
                            });
                    }else{
                        const followingData = {
                            ...data[followingName[0]],
                            followers : [ {name : this.props.name, email : this.props.email}]
                        }
                        axios.put('https://sample-social-media.firebaseio.com/users/'+ followingName[0] +'.json', followingData)
                            .then(res =>{
                                console.log(name +'is now followed by you');
                                this.setState({followers : res.data.followers});
                            })
                            .catch(error =>{
                                console.log(error);
                            });
                    }


                })
                .catch(error => console.log(error));


    }
    unFollowHandler = () =>{
        const email = this.props.props.match.params.id + '@gmail.com';
        const updatedFollowers = this.state.followers.filter(item => item.email !== this.props.email);
        const updatedFollowing = this.state.selfFollowing.filter(item => item.email !== email);
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res => {
                const data = res.data;
                const userId = Object.keys(data).filter(item => data[item].email === email);
                const myId = Object.keys(data).filter(item => data[item].email === this.props.email);
                console.log(userId);
                const updatedMyData = {
                    ...data[myId[0]],
                    following : updatedFollowing
                }
                const updatedUserData = {
                    ...data[userId[0]],
                    followers : updatedFollowers
                }
                axios.put('https://sample-social-media.firebaseio.com/users/'+ userId[0] +'.json', updatedUserData)
                    .then(res =>{
                        console.log('Follower Deleted');
                        this.setState({followers : updatedFollowers});
                    })
                    .catch(error =>{
                        console.log(error);
                    });
                axios.put('https://sample-social-media.firebaseio.com/users/'+ myId[0] +'.json', updatedMyData)
                    .then(res =>{
                        console.log('Follower Deleted');
                        this.setState({selfFollowing : updatedFollowing});
                    })
                    .catch(error =>{
                        console.log(error);
                    });

            })
            .catch(error =>{
                console.log(error);
            })

    }

    render() {
        // console.log('Posts array',Object.keys(this.state.posts).length);
        const name = this.props.props.match.params.id;
        const email = this.props.props.match.params.id + '@gmail.com';
        let follow_button = <center><button onClick={this.followingHandler} className="follow">FOLLOW</button></center>;
        if (this.state.followers){
            if (this.state.followers.length > 0) {
                const following_confirm = this.state.followers.filter(item => item.email === this.props.email);
                if (following_confirm.length){
                    follow_button = <center><button className="following-user" onClick={this.unFollowHandler}>FOLLOWING</button></center>;
                }else{
                    follow_button = <center><button className="follow" onClick={this.followingHandler}>FOLLOW</button></center>;
                }
            }
        }
        let component = Object.keys(this.state.posts).length > 0?
            Object.keys(this.state.posts).map(item =>
            {
                return <SinglePost itemList={this.state.posts[item]} />
            }) : <p style={{textAlign : "center"}}>No posts found</p>;



        if (this.state.component === "posts"){
            component = Object.keys(this.state.posts).length > 0 ?
                Object.keys(this.state.posts).map(item =>
                {
                    return <SinglePost itemList={this.state.posts[item]} />
                }) : <p style={{textAlign : "center"}}>No posts found</p>;

        }
        if (this.state.component === "following"){
            component = this.state.following.length > 0 ?
                this.state.following.map(item =>
                {
                    return <Following name={item.name} email={item.email} />;
                }) : <p style={{textAlign : "center"}}>You are not following anyone yet</p>;
        }
        if (this.state.component === "followers"){
            component = this.state.followers.length > 0 ?
                this.state.followers.map(item =>
                {
                    return <Followers name={item.name} email={item.email} />;
                }) : <p style={{textAlign : "center"}}>You don't have followers yet!!</p>;
        }
        return(
            <Aux>
                <div className="profile-posts"><br/>
                    <h2 style={{padding : 0, margin : 0}}>Profile</h2>

                    <div className="name-block" style={{textAlign : "center"}}>

                                <div className="profile-pic">
                                    <img src={logo} className="pic-size" alt=""/>
                                </div>
                                <div className="name">
                                    <p style={{marginTop: 0,padding: 0,fontSize: "13px",fontWeight: "bold"}}><br/>{name}<br/><span
                                        style={{color: "#aaa",fontSize: "11px",fontWeight: "lighter"}}>{email}</span>
                                    </p>
                                </div>

                            <div  style={{textAlign : "center"}}>
                                <center>{follow_button}</center>
                            </div><br/>
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


export default connect(mapStateToProps)(OtherProfileItem);