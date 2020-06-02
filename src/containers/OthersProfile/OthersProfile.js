import React, {Component} from "react";
import Layout from "../../hoc/Layout";
import OtherProfileItem from "../../components/UI/OtherProfileItem/OtherProfileItem";
import {connect} from "react-redux";
import {updateRedirectUrl} from "../../store/actions";


class Profile extends Component{
    componentDidMount() {
        console.log('current props',this.props);
        this.props.onUpdateRedirectUrl(this.props.match.url);
        console.log(this.props.redirectUrl);
    }

    render() {
        return (
            <div>
                <Layout/>
                <div className="distance"><br/><br/><br/><br/></div>
                <div className="mobile-distance"><br/><br/></div>
                <OtherProfileItem props={this.props}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        redirectUrl : state.redirectUrl
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onUpdateRedirectUrl : (url) => dispatch(updateRedirectUrl(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
