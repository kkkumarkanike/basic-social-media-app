import React, {Component} from 'react';
import {Redirect, Route,withRouter} from "react-router";
import {Switch} from "react-router";
import './App.css';
import Aux from './hoc/Auxilary';
import {connect} from "react-redux";
import CreatePost from "./containers/CreatePost/CreatePost";
import {checkUserSession} from './store/actions/index';

// import Layout from './hoc/Layout';
import Launcher from './containers/Launcher/Launcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBatteryFull,
    faCoffee,
    faDiceOne, faGrinHearts, faHeart,
    faLock,
    faMailBulk,
    faPen,
    faRemoveFormat,
    faSms
} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import Layout from "./hoc/Layout";
import Logout from "./containers/Logout";
import Posts from "./containers/Posts/Posts";
import Profile from "./containers/Profile/Profile";
import Home from "./containers/Home/Home";
import OthersProfile from "./containers/OthersProfile/OthersProfile";
import Empty from './containers/Empty';
import SearchUsers from "./containers/SearchUsers/SearchUsers";
import Sample from "./containers/Sample";
import Comments from "./containers/Comments/Comments";

class App extends Component {

    componentDidMount() {

        this.props.onCheckSession();
        const redirectUrl = localStorage.getItem("url");
        if (redirectUrl){
            this.props.history.push(redirectUrl);
        }
    }

    render() {
     let routes = (
             <Switch>
                 {/*<Route path="/profile" component={Profile} />*/}
                 {/*<Route path='/search' exact component={SearchUsers}/>*/}
                 <Route path='/sample' exact component={Sample} />
                 <Route path='/signin' exact component={Launcher} />
                 <Route path='/signup' exact component={Launcher}/>
                 <Route path='/' exact component={Home} />
                 {/*<Route path='/' exact component={Home}/>*/}
                 <Redirect to='/'/>
             </Switch>
     );
     if (this.props.isSignin) {
         routes = (
             <Switch>

                 <Route path="/createpost" exact component={CreatePost}/>
                 <Route path='/search' exact component={SearchUsers}/>
                 <Route path='/empty/:id' component={Empty}/>
                 <Route path='/comments/:id' exact component={Comments}/>
                 <Route path='/other-profile/:id' component={OthersProfile}/>
                 {/*<Route path='/profile' exact component={Profile} />*/}
                 <Route path="/logout" exact component={Logout}/>
                 <Route path="/profile" component={Profile} />
                 <Route path="/posts" exact component={CreatePost}/>
                 <Route path='/post' exact component={Posts} />
                 <Route path='/' component={Home}/>
                 <Redirect to='/'/>
             </Switch>
         );
     }
     return (
         <div>
             {routes}
         </div>
     );
 }
}

const mapStateToProps = state =>{
    return {
        isSignin: state.isSignin,
        redirectUrl : state.redirectUrl
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onCheckSession : () => dispatch(checkUserSession())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
// <FontAwesomeIcon icon={faCoffee}/><br/>
// <FontAwesomeIcon icon={faMailBulk}/><br/>
// <FontAwesomeIcon icon={faPen}/><br/>
// <FontAwesomeIcon icon={faDiceOne}/><br/>
// <FontAwesomeIcon icon={faBatteryFull}/>
// <FontAwesomeIcon icon={faHeart} style={{color:'blue',fontSize:'30px',border:'1px solid red'}}/>
