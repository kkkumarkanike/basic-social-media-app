import React, {Component} from "react";
import Layout from "../../hoc/Layout";
import ProfileItem from './../../components/UI/ProfileItem/ProfileItem';
import './Profile.css';
import {connect} from "react-redux";
import {updateRedirectUrl} from './../../store/actions/index';

class Profile extends Component{
    componentDidMount() {
        this.props.onUpdateRedirectUrl(this.props.match.url);
        console.log(this.props.redirectUrl);
    }

    render() {
        return (
            <div>
                <Layout/>
                <div className="distance"><br/><br/><br/><br/></div>
                <div className="mobile-distance"><br/><br/></div>
                <ProfileItem props={this.props}/>
                <br/><br/>
            </div>
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


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
