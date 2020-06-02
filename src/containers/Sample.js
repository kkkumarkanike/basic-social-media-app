import React,{Component} from "react";
import {Redirect} from "react-router";
import {NotificationManager,NotificationContainer} from 'react-notifications';

class Sample extends Component{
    componentDidMount() {
        console.log(this.props);
    }
    successHandler = () =>{
        NotificationManager.success('Success message', 'Title here');
    }

    render() {
        return (
          <div>
              <button onClick={this.successHandler}>Click me</button>
              <NotificationContainer/>
          </div>
        );
    }

}

export default Sample;