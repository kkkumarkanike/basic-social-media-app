import React,{Component} from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";

class Empty extends Component{
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let path='/other-profile/'+ this.props.match.params.id;
        if (this.props.match.params.id === this.props.myName){
            path = '/profile';
        }
        // return <h1>Hai</h1>;
        return <Redirect to={path}/>;
    }

}
const mapStateToProps = state =>{
    return {
        myName : state.name
    }
}

export default connect(mapStateToProps)(Empty);