import React, {Component} from "react"
import axios from 'axios';
import Layout from "../../hoc/Layout";
import Post from './../../components/UI/Post/Post';
import {connect} from "react-redux";
import './Posts.css';
import './Flex.css';
import logo from './posts.png';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
// import {getPosts} from './../../store/actions/index';
import {getPostsSuccess} from "../../store/actions/actions";
import SearchUsers from "../SearchDesk/SearchUsers";
import MainSpinner from './../../components/UI/MainSpinner/MainSpinner';
import {NotificationManager,NotificationContainer} from 'react-notifications';
import {updateRedirectUrl} from './../../store/actions/index';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBlog, faPenAlt, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import {faBlogger, faBloggerB} from "@fortawesome/free-brands-svg-icons";


class Posts extends Component{
    componentDidMount() {
        console.log('props',this.props);
        this.props.onUpdateRedirectUrl(this.props.match.url);
        console.log(this.props.redirectUrl);
        axios.get('https://sample-social-media.firebaseio.com/posts.json')
            .then(res =>{
                console.log(res.data);
                this.props.onLoadPosts(res.data);
                console.log('State Stored posts',this.props.posts)

            })
            .catch(error =>{
                console.log(error);
            });
        console.log("getposts success");
    }
    async updateLikes(name,items,like){
        const data = {
            ...items,
            likes : like + 1
        }
        const response = await axios.put('https://sample-social-media.firebaseio.com/posts/'+ name +'.json', data);
        NotificationManager.info('You liked this post');
        console.log(response);
        console.log(response.data);
    }
    // async updateComments(){}
    async  handleSearchTermSubmit (name , value, com , itemList, itemName)  {
        if (value.length > 0){
            const comments = {
                name : name,
                message : value
            }
            const data = {
                ...itemList,
                comments : [
                    ...com,
                    comments
                ]
            }
            const response = await axios.put('https://sample-social-media.firebaseio.com/posts/'+ itemName +'.json', data);
            NotificationManager.info('You have commented on this post');
            console.log(response);
            console.log(response.data);
            // console.log(value);
        }else{
            NotificationManager.error("Comment should have more than one character","Error",3000);
        }
    }


    render() {
        let posts = <MainSpinner/>;
        if (this.props.posts) {
            const len = Object.keys(this.props.posts).length;
            const obj = this.props.posts;
            if (len > 0) {
                posts = (
                    Object.keys(obj).map(item => {
                        return (
                            <Post click2={this.handleSearchTermSubmit} user={this.props.name} click={this.updateLikes}
                                  comments={obj[item].comments} itemName={item} itemsList={obj[item]}
                                  name={obj[item].name} email={obj[item].email} key={item} message={obj[item].message}
                                  likes={obj[item].likes}/>
                        );
                    })
                );
            }
            else{
                posts = (
                    <div className="text-center">
                        <p style={{color : "#4C9494", fontSize : "60px", padding : 0, marginTop : "80px", marginBottom : "10px"}}><FontAwesomeIcon icon={faStickyNote}/></p>
                        <h4 style={{textAlign : "center", padding:0, margin : 0}}>No posts found</h4>
                        <br/><br/><br/>
                        <Link to='/createpost'><button className="submit-button">Create Post&nbsp;&nbsp;<FontAwesomeIcon icon={faPenAlt}/></button></Link>
                    </div>
                );
            }
        }//
        // }
        return (
            <div>
                <Layout/>
                <div className="flex-container">

                    <div className="flex-child1">
                        <div className="gap">
                            <br/><br/><br/><br/><br/>
                            {posts}
                        </div>
                    </div>

                    <div className="flex-child2">
                        <br/><br/><br/>
                        <SearchUsers/>
                    </div>

                </div>
                <div style={{margin : "auto", padding : 0}} className="mobile">
                    <div className="gap">
                        <br/><br/>
                        {posts}
                    </div>
                </div>
                <div style={{margin : "auto", padding : 0}} className="tablet">
                    <div className="gap">
                        <br/><br/><br/><br/>
                        {posts}
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        posts : state.posts,
        name : state.name,
        redirectUrl : state.redirectUrl
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLoadPosts : (posts) => dispatch(getPostsSuccess(posts)),
        onUpdateRedirectUrl : (url) => dispatch(updateRedirectUrl(url))
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Posts));