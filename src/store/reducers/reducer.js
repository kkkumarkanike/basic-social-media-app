import React from "react";
import * as actionTypes from './../actions/actionTypes';
import axios from "axios";
const initialState = {
    isSignin : false,
    isSignIn_success_message : false,
    isSignIn_error : false,
    isSignUp : false,
    isSignUp_error : false,
    expireTime : null,
    token : null,
    email : null,
    userId : null,
    posts : [],
    name : null,
    redirectUrl : null
};

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                isSignUp: true
            }
        case actionTypes.SIGNUP_USER_FAIL:
            return {
                ...state,
                isSignUp_error: action.message
            }
        case actionTypes.REMOVE_SIGNUP_SUCCESS:
            return {
                ...state,
                isSignUp : false
            }
        case actionTypes.REMOVE_SIGNUP_FAIL:
            return {
                ...state,
                isSignUp_error: false
            }
        {/*********************** User Sign In ********************************************/}
        case actionTypes.SIGNIN_USER_SUCCESS:
            // console.log('userId',action.expireTime);
            // console.log('token',action.token);
            // console.log('email',action.email);
            // console.log('expireTime',action.userId);
            const expireDate = new Date(new Date().getTime() +  action.userId * 1000);
            localStorage.setItem("token", action.token);
            localStorage.setItem("userId" , action.expireTime);
            localStorage.setItem("email", action.email);
            localStorage.setItem("expireTime" , expireDate);
            localStorage.setItem("name", action.email.split('@')[0]);
            return {
                ...state,
                isSignin: true,
                token : action.token,
                userId: action.expireTime,
                email: action.email,
                expireTime: action.userId,
                name : action.email.split('@')[0]
            }

        case actionTypes.SIGNIN_USER_FAIL:
            return {
                ...state,
                isSignIn_error: true
            }
        case actionTypes.REMOVE_SIGNIN_SUCCESS:
            return {
                ...state,
                isSignIn_success_message : false
            }
        case actionTypes.REMOVE_SIGNIN_FAIL:
            return {
                ...state,
                isSignIn_error: false
            }
        case actionTypes.POST_CREATE_SUCCESS:
            console.log('Post created successfully');

        case actionTypes.POST_CREATE_FAIL:
            console.log('Post creation failed');

        case actionTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts : action.posts
            }
        case actionTypes.CHECK_USER_SESSION:

            return {
                ...state,
                isSignin: action.isSignin,
                token : action.token,
                userId: action.userId,
                email: action.email,
                expireTime: action.expireTime,
                name : action.name,
                redirectUrl: state.redirectUrl
            }

        case actionTypes.LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("expireTime");
            localStorage.removeItem("name");
            localStorage.removeItem("url");
            return {
                ...state,
                isSignin : false,
                isSignIn_success_message : false,
                isSignIn_error : false,
                isSignUp : false,
                isSignUp_error : false,
                expireTime : null,
                token : null,
                email : null,
                userId : null,
                name: null

            }
        case actionTypes.REDIRECT_URL:
            localStorage.setItem("url" , action.url);
            return {
                ...state,
                redirectUrl: action.url
            }

    }
    return state;
}

export default reducer;