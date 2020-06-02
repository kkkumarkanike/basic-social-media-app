import React from "react";
import Aux from './../../../hoc/Auxilary';
import './SideNav.css';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faSearch, faShareAlt, faSignInAlt, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {NavLink,Link} from "react-router-dom";


const sideNav = props =>{
    let combinedClasses = ['sideNav','close'].join(' ');
    if (props.showSideNav){
        combinedClasses = ['sideNav','open'].join(' ');
    }
    const signin = <FontAwesomeIcon icon={faSignInAlt}/>;
    const signup = <FontAwesomeIcon icon={faUser}/>;
    const logout = <FontAwesomeIcon icon={faSignOutAlt}/>;
    const profile = <FontAwesomeIcon icon={faUser}/>;
    const createpost = <FontAwesomeIcon icon={faPen}/>;
    const search = <FontAwesomeIcon icon={faSearch}/>;
    return (
        <Aux>
                <nav className={combinedClasses}>
                    <ul>
                        <li id="home"
                            style={{fontSize: "20px",fontWeight: "bold"}}><Link to='/' className="link-style"><FontAwesomeIcon icon={faShareAlt}/>&nbsp;FC</Link>
                        </li>
                        {props.isSignin ? <Link to="/profile" style={{ textDecoration: 'none' }}><li id="profile" className='profile'>{signup}&nbsp;Profile
                            </li></Link> : null }
                        {props.isSignin ? <Link to="/search" style={{ textDecoration: 'none' }}><li id="profile" className='profile'>{search}&nbsp;Search Users
                        </li></Link> : null }
                        {!props.isSignin ? <Link to="/signup" style={{ textDecoration: 'none' }}><li id="profile"  className='profile' >{signup}&nbsp;Signup
                        </li></Link> : null}
                        {props.isSignin ? <Link to="/createpost" style={{ textDecoration: 'none' }}><li id="profile" className='profile'>{signup}&nbsp;Create Post
                        </li></Link> : null }
                        {!props.isSignin ?<Link to="/signin" style={{ textDecoration: 'none' }}><li id="profile"  className="profile">{signin}&nbsp;Signin
                        </li></Link> : <Link to="/logout" className="tags" style={{ textDecoration: 'none' }}><li id="logout"  className="signin">{logout}&nbsp;Logout
                        </li></Link> }

                    </ul>
                </nav>
        </Aux>
    );
}
const mapStateToProps = state =>{
    return {
        isSignin : state.isSignin
    }
}

export default connect(mapStateToProps)(sideNav);