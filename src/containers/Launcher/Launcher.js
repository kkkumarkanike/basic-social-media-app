import React, {Component} from 'react';
import Aux from './../../hoc/Auxilary';
import Input from './../../components/UI/Input/Input';
import './Launcher.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from "react-redux";
import Layout from './../../hoc/Layout';
import {signup,signUpSuccessRemove,signUpFailRemove,signin,signInSuccessRemove,signInFailRemove} from "../../store/actions/index";
import 'react-notifications/lib/notifications.css';
import {NotificationManager,NotificationContainer} from 'react-notifications';
import {faArrowLeft, faArrowRight, faRecycle} from "@fortawesome/free-solid-svg-icons";
import {faSwift} from "@fortawesome/free-brands-svg-icons";
// import ReactNotification from 'react-notifications-component';
// import 'react-notifications-component/dist/theme.css';


class Launcher extends Component{
    state = {
        signup : true,
        email : '',
        password : '',
        repass : '',
        isSignupSuccess : false,
        isSignupFail : false
    }
    componentDidMount() {
        console.log('current props',this.props);
    }

    handleEmail = (event) =>{
        this.setState({email : event.target.value})
    }
    handlePassword = (event) =>{
        this.setState({password : event.target.value})
    }
    handleRePassword = (event) =>{
        this.setState({repass : event.target.value});
    }
    signInChangeHandler = props =>{
        this.setState({signup : !this.state.signup});
    }
    signUpHandler = (event) =>{
        event.preventDefault();
        if (this.state.email.length === 0){
            NotificationManager.error('Enter your email', 'Error', 3000);
        }else{
            if (this.state.repass.length >= 6){
                if (this.state.password === this.state.repass){
                    this.props.onSignUp(this.state.email,this.state.password);
                }else{
                    NotificationManager.error('Password and Re-entered password should match', 'Error', 3000);
                }
            }else{
                NotificationManager.error('Password must contain atleast 6 characters', 'Error', 3000);
            }
        }



}


    signInHandler = (event) =>{
        event.preventDefault();
        if (this.state.email.length > 0){
            if (this.state.password.length > 0){
                console.log(this.state.email);
                console.log(this.state.password);
                this.props.onSignIn(this.state.email,this.state.password);
                setTimeout(() => {
                    this.props.history.replace('/');
                }, 2000);
            }else{
                NotificationManager.error('Enter the password', 'Error', 3000);
            }
        }else{
            NotificationManager.error('Enter your email', 'Error', 3000);
        }

    }

    render() {
        let signup = null;
        if (this.state.signup) {
            signup = (
                <form onSubmit={this.signUpHandler}>
                    <Input type="email" label="Email" placeholder="email" value={this.state.email} change={this.handleEmail}/>
                    <Input type="password" label="Password" placeholder="password" value={this.state.password} change={this.handlePassword}/>
                    <Input type="password" label="Re-Enter Password" placeholder="Re-Enter password" value={this.state.repass} change={this.handleRePassword}/>
                    <button className="submit-button">SUBMIT&nbsp;<FontAwesomeIcon icon={faArrowRight}/></button>
                </form>
            );
        }
            else{
               signup = (
                   <form onSubmit={this.signInHandler}>
                       <Input type="email" label="Email" placeholder="email" change={this.handleEmail}/>
                       <Input type="password" label="Password" placeholder="password" change={this.handlePassword}/>
                       <button type="submit" className="submit-button">SUBMIT&nbsp;<FontAwesomeIcon icon={faArrowRight}/></button>
                   </form>
               );
            }
        return (
            <Aux>  <Layout/>
                <br/><br/><br/><br/>
               <div className="space">
                   <h2 style={{textAlign : "center", color : "#4C9494"}} >{this.state.signup ? "Sign Up" : "Login"}</h2>
                   <div className="signup-card">
                       {signup}
                   </div><br/>
                   <center><button  style={{textAlign : "center", padding : "8px", color : "white", backgroundColor : "#4C9494", border : "none", borderRadius : "2px"}} onClick={this.signInChangeHandler}>{this.state.signup ? "SWITCH TO SIGNIN" : "SWITCH TO SIGNUP    "}&nbsp;<FontAwesomeIcon icon={faRecycle}/></button></center>
                   {/*<div>*/}
                   {/*    {this.props.isSignUp? <p style={{color : "green",textAlign : "center"}} onClick={this.props.onRemoveSignUpSuccess}><b>Sign Up successful</b></p> :  null}*/}
                   {/*    {this.props.isSignUp_error ? <p style={{color : "red", textAlign : "center"}} onClick={this.props.onRemoveSignUpFail}><b>Account already exists</b></p> : null }*/}
                   {/*    {this.props.isSignIn_success_message ? <p style={{color : "green",textAlign : "center"}} onClick={this.props.onRemoveSignInSuccess}><b>Sign In successful</b></p> :  null}*/}
                   {/*    {this.props.isSignIn_error ? <p style={{color : "red", textAlign : "center"}} onClick={this.props.onRemoveSignInFail}><b>Invalid Email or Password</b></p> : null }*/}
                   {/*</div>*/}
               </div>
                <br/>
                <NotificationContainer/>
                {/*<ReactNotification/>*/}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isSignUp: state.isSignUp,
        isSignUp_error: state.isSignUp_error,
        isSignIn_success_message : state.isSignIn_success_message,
        isSignIn_error : state.isSignIn_error
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onSignUp : (email,password) =>{dispatch(signup(email,password))},
        onRemoveSignUpSuccess : () =>{dispatch(signUpSuccessRemove())},
        onRemoveSignUpFail : () =>{dispatch(signUpFailRemove())},
        onSignIn : (email,password) => {dispatch(signin(email,password))},
        onRemoveSignInSuccess : () =>{dispatch(signInSuccessRemove())},
        onRemoveSignInFail : () =>{dispatch(signInFailRemove())},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Launcher);