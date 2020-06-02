import React from 'react';
import classes from './Navigation.css';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPen,
    faRegistered, faShare, faShareAlt, faShareAltSquare, faShareSquare,
    faSignInAlt, faSignOutAlt, faUpload, faUser
} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import {Link, NavLink} from "react-router-dom";
import {logout} from './../../store/actions/index';

class Navigation extends React.Component {


   render() {
       const signin = <FontAwesomeIcon icon={faSignInAlt}/>;
       const signup = <FontAwesomeIcon icon={faUser}/>;
       const logout = <FontAwesomeIcon icon={faSignOutAlt}/>;
       const profile = <FontAwesomeIcon icon={faUser}/>;
       const createpost = <FontAwesomeIcon icon={faPen}/>;
       const share = <FontAwesomeIcon icon={faShareAlt}/>;

       return (
           <div className="navigation">
               <nav id="mainNav" className="none">
                       <ul>
                           <li id="home" style={{fontSize: '15px'}}><Link to="/" className="link-style">{share}&nbsp;FC</Link></li>

                           {!this.props.isSignin ?<Link to="/signup" style={{color : "white"}}> <li id="signin" style={{float: 'right', fontSize: '15px'}} className="signin">{signin}&nbsp;Signin
                           </li></Link> : <NavLink to="/logout" className="tags" activeStyle={{color : "white"}}><li id="logout" style={{float: 'right', fontSize: '15px'}} className="signin">{logout}&nbsp;Logout
                           </li></NavLink> }
                           {!this.props.isSignin ? <Link to="/signup" style={{color : "white"}}><li id="signup" style={{float: 'right', fontSize: '15px'}} className='signup'>{signup}&nbsp;Signup
                           </li></Link> : null}
                           {this.props.isSignin ?  <NavLink to="/createpost" className="tags" activeStyle={{color : "white"}}><li id="Create Post" style={{float: 'right', fontSize: '15px'}} className='createpost'>{createpost}&nbsp;Create Post
                           </li></NavLink>: null}
                           {this.props.isSignin ? <NavLink to="/profile" className="tags" activeStyle={{color : "white"}}><li id="profile" style={{float: 'right', fontSize: '15px'}} className='profile'>{profile}&nbsp;Profile</li></NavLink> : null }


                       </ul>
               </nav>

           </div>
       );
   }
}
const mapStateToProps = state =>{
    return {
        isSignin : state.isSignin
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLogout : () => dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);