import React, {Component} from "react";
import Navigation from './../components/Navigation/Navigation';
import HambergerNav from './../components/Navigation/HambergerNav/HambergerNav';
import SideNav from './../components/Navigation/SideNav/SideNav';
import BackDrop from './../components/Navigation/Backdrop/BackDrop';
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

class Layout extends Component{
    state = {
        sideNavShow : false,
        backDropShow : false
    }
    toggleNavHandler = () =>{
        this.setState({sideNavShow : !this.state.sideNavShow, backDropShow : !this.props.backDropShow});
    }
    removeBackdropHandler = () =>{
        this.setState({sideNavShow : false, backDropShow : false});
    }

    render() {
        return (
            <div>
                <Navigation/>
                <HambergerNav clicked={this.toggleNavHandler}/>
                <SideNav showSideNav={this.state.sideNavShow}/>
                <BackDrop showBackDrop={this.state.backDropShow} clicked={this.removeBackdropHandler}/>
            </div>
        );
    }
}


export default Layout;