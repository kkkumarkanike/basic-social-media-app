import React, {Component} from "react";
import Aux from './../../hoc/Auxilary';
import Layout from "../../hoc/Layout";
import './Home.css';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faShareAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Posts from "../Posts/Posts";
import MainSpinner from './../../components/UI/MainSpinner/MainSpinner';
import {updateRedirectUrl} from './../../store/actions/index';


class Home extends Component{
    componentDidMount() {
        this.props.onUpdateRedirectUrl(this.props.match.url);
        console.log(this.props.redirectUrl);
    }

    render() {
        let home = <MainSpinner/>;
         if (!this.props.isSignin){
             home = (
                 <div>
                     <Layout/><br/><br/><br/><br/><br/><br/>
                     <div className="home">
                         <p className="icon"><FontAwesomeIcon icon={faShareAlt}/>&nbsp;</p>
                         <p className="banner"><b>Friends Connect</b></p>
                         <button className="btn primary"><Link to="/signup" className="link-style"><b>SignUp</b>&nbsp;<FontAwesomeIcon icon={faArrowRight}/></Link></button>
                     </div>
                 </div>
             );
         }
        if (this.props.isSignin){
            home = <Posts/>;
        }
        return(
            <Aux>
                {home}
            </Aux>
        );

    }
}
const mapStateToProps = state =>{
    return{
        isSignin: state.isSignin,
        redirectUrl : state.redirectUrl
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onUpdateRedirectUrl : (url) => dispatch(updateRedirectUrl(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);