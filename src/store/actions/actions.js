import React from "react";
import * as actionTypes from './actionTypes';
import axios from "axios";
import {NotificationManager} from 'react-notifications';
export const signUpStart = () =>{
    return{
        type : actionTypes.SIGNUP_USER_START
    }
}
export const signUpSuccessRemove = () =>{
    return {
        type : actionTypes.REMOVE_SIGNUP_SUCCESS
    }
}
export const signUpFailRemove = () =>{
    return {
        type : actionTypes.REMOVE_SIGNUP_FAIL
    }
}



export const signUpSuccess = () =>{
    return {
        type : actionTypes.SIGNUP_USER_SUCCESS
    }
}
export const signUpFail = (message) =>{
    return{
        type : actionTypes.SIGNUP_USER_FAIL,
        message : message
    }
}

export const signup = (email,password) =>{
    return dispatch =>{
        console.log(email);
        console.log(password);
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDLYMBtbHacgnvn-myiffO_gc59skDSis";
        let  data = {
            email : email,
            password : password,
            returnSecureToken: true
        };
        axios.post(url,data)
            .then(response =>{
                console.log(response.data);
                NotificationManager.success('Account created.', 'Sign Up Successful');
                createUser(email);
                dispatch(signUpSuccess());
            })
            .catch(error =>{
                console.log(error.response.data.error.message);
                let err = null;
                if (error.response.data.error.message === "EMAIL_EXISTS"){
                    err = "Email already exists";
                }else{
                    err = error.response.data.error.message;
                }


                NotificationManager.error(err, 'Error!', 3000);
                // dispatch(signUpFail(error.response.data.error))
            });
    }
}


//SignIn


export const signInStart = () =>{
    return{
        type : actionTypes.SIGNIN_USER_START
    }
}
export const signInSuccessRemove = () =>{
    return {
        type : actionTypes.REMOVE_SIGNIN_SUCCESS
    }
}
export const signInFailRemove = () =>{
    return {
        type : actionTypes.REMOVE_SIGNIN_FAIL
    }
}


export const signInSuccess = (token,userId,email,expireTime) =>{
    return {
        type : actionTypes.SIGNIN_USER_SUCCESS,
        token : token,
        userId : userId,
        email : email,
        expireTime : expireTime
    }
}
export const signInFail = (message) =>{
    return{
        type : actionTypes.SIGNIN_USER_FAIL,
        message : message
    }
}
export const createUser = (email) =>{
    const userData = {
        name : email.split('@')[0],
        email : email
    }
    axios.post('https://sample-social-media.firebaseio.com/users.json', userData)
        .then(res =>{
            console.log('USER CREATED',res.data);
        })
        .catch(error =>{
            console.log(error);
        });
}

export const signin = (email,password) =>{
    return dispatch =>{
        console.log(email);
        console.log(password);
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDLYMBtbHacgnvn-myiffO_gc59skDSis";
        let  data = {
            email : email,
            password : password,
            returnSecureToken: true
        };
        axios.post(url,data)
            .then(response =>{
                const res = response.data;
                console.log(res);
                console.log('Data');
                console.log('token',res.idToken);
                console.log('localId',res.localId);
                console.log('email',res.email);
                console.log('expire Time',res.expiresIn);
                const token = res.idToken;
                const expireTime = res.expiresIn;
                const email = res.email;
                const userId = res.localId;
                dispatch(signInSuccess(token,expireTime,email,userId));
            })
            .catch(error =>{
                console.log(error);
                let err = null;
                if (error.response.data.error.message === "INVALID_PASSWORD"){
                    err = "Invalid Password";
                }
                NotificationManager.error(err, 'Error!', 3000);
                dispatch(signInFail(error.response.data.error.message));
            });
    }
}

export const postCreationSuccess = () =>{
    return{
        type : actionTypes.POST_CREATE_SUCCESS
    }
}

export const postCreationFail = () =>{
    return{
        type : actionTypes.POST_CREATE_FAIL
    }
}
export const getPostsSuccess = (posts) =>{
    return {
        type : actionTypes.GET_POSTS_SUCCESS,
        posts : posts
    }
}
export const getPostsFail = (message) =>{
    return {
        type : actionTypes.GET_POSTS_FAIL,
        error : message
    }
}
export const getPosts = () =>{
   return dispatch =>{
       axios.get('https://sample-social-media.firebaseio.com/posts.json')
           .then(res =>{
               console.log(res.data);
               dispatch(getPostsSuccess(res.data));
           })
           .catch(error =>{
               console.log(error);
               dispatch(getPostsFail(error.message))
           });
   }
}

export const postCreate = (postData) =>{
    return dispatch =>{
        const url = "https://sample-social-media.firebaseio.com/posts.json";
        axios.post(url,postData)
            .then(response =>{
                    console.log(response.data);
                    dispatch(postCreationSuccess());
                }
            )
            .catch(error =>{
                console.log(error);
                dispatch(postCreationFail());
            }
        );
    }
};

export const logout = () =>{
    return{
        type : actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (expireTime) =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(logout());
        }, expireTime * 1000);
    }
}
export const checkUserSessionSuccessful = (isSignin,token,userId,email,expireDate,name) =>{
    return{
        type : actionTypes.CHECK_USER_SESSION,
        isSignin : isSignin,
        token : token,
        userId : userId,
        email : email,
        expireTime : expireDate,
        name : name
    }
}
export const checkUserSession = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }else{
            const expireDate = new Date(localStorage.getItem('expireTime'));
            console.log(expireDate.getTime() - new Date().getTime());
            console.log("Exprire Date Time",expireDate.getTime());
            console.log("New Date Time", new Date().getTime());
            if (expireDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                const isSignin = true;
                const name = localStorage.getItem('name');
                dispatch(checkUserSessionSuccessful(isSignin,token,userId,email,expireDate,name));
                console.log((expireDate.getTime() - new Date().getTime()) / 1000);
                dispatch(checkAuthTimeout((expireDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const updateRedirectUrl = (redirectUrl) =>{
    return{
        type : actionTypes.REDIRECT_URL,
        url : redirectUrl
    }
}


