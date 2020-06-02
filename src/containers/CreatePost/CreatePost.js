import React,{Component} from "react";
import Layout from "../../hoc/Layout";
import './CreatePost.css';
import Aux from './../../hoc/Auxilary';
import SinglePost from "../../components/UI/Createpost/Createpost";
import {connect} from "react-redux";
import axios from 'axios';
import {NotificationManager,NotificationContainer} from 'react-notifications';
import {updateRedirectUrl} from "../../store/actions";

class CreatePost extends Component{
    state = {
        message : '',
        comments : [{name : "kkk", message : 'Hi'}]
    }
    componentDidMount() {
        console.log(this.props);
        this.props.onUpdateRedirectUrl(this.props.match.url);
        console.log(this.props.redirectUrl);
    }
    randomString = (length, chars) => {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    addPostHandler = () => {
        if (this.state.message.length > 1){
            const postData = {
                postId : this.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                token: this.props.token,
                message: this.state.message,
                userId : this.props.userId,
                comments : this.state.comments,
                likes : 0,
                email : this.props.email,
                name : this.props.email.split('@')[0]
            };
            console.log(this.props.userId);
            console.log(this.props.expireTime);
            const url = "https://sample-social-media.firebaseio.com/posts.json";
            axios.post(url,postData)
                .then(response =>{
                        console.log(response.data);
                        // dispatch(postCreationSuccess());
                        console.log(this.props);
                        this.props.history.replace('/post');
                    }
                )
                .catch(error =>{
                        console.log(error);
                        // dispatch(postCreationFail());
                    }
                );

        }else{
            NotificationManager.error("Story must contains atleast 2 characters", "Error", 3000);
        }
    }
    changeHandler = (event) =>{
        this.setState({message : event.target.value});
    }
    render() {
        return (
            <div>
                <Layout/>
                <div className="distance"><br/><br/><br/><br/></div>
                <div className="mobile-distance"><br/><br/></div>
                <div className="space">
                    <SinglePost changed={this.changeHandler} click={this.addPostHandler}/>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        token : state.token,
        email : state.email,
        userId : state.userId,
        redirectUrl: state.redirectUrl
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onUpdateRedirectUrl : (url) => dispatch(updateRedirectUrl(url))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);