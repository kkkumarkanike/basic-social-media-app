import React, {Component} from 'react';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPen,
    faRegistered,
    faSignInAlt, faSignOutAlt, faUpload, faUser
} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import {Link, NavLink, Redirect} from "react-router-dom";
import {logout} from './../store/actions/index';
import MainSpinner from './../components/UI/MainSpinner/MainSpinner';

class Logout extends Component{
    state = {
        logout : false
    }
    componentDidMount() {
        this.props.onLogout();
        this.setState({logout : true});
    }

    render() {
        let lg = <MainSpinner/>;
        if (this.state.logout){
            lg =  setTimeout(() =>{
                return <Redirect to='/'/>;
            }, 2000);
        }
        return(
            <div>
                {lg}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout : () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);