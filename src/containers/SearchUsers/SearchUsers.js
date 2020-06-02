import React, {Component} from "react";
import Aux from './../../hoc/Auxilary';
import './SearchUsers.css';
import axios from "axios";
import Spinner from './../../components/UI/Spinner/Spinner';
import User from './User/User';
import Layout from "../../hoc/Layout";

class SearchUsers extends Component{
    state = {
        searchQuery : '',
        users : [],
        load : false
    }
    componentDidMount() {
        console.log('current props',this.props);
    }

    searchHandler = (event) =>{
        this.setState({load : true, searchQuery : event.target.value});
        axios.get('https://sample-social-media.firebaseio.com/users.json')
            .then(res =>{
                console.log(res.data);
                const data = res.data;
                if (this.state.searchQuery === ''){
                    this.setState({users : [], load : false});
                }else{
                    const filteredResult = Object.keys(data).filter(item => {
                        if (data[item].name.match(this.state.searchQuery)){
                            return true;
                        }else{
                            return false;
                        }
                    });
                    let searchedUsers = [];
                    filteredResult.map(item => {
                        searchedUsers.push(data[item]);
                    });
                    this.setState({users : searchedUsers, load : false});
                }
            })
            .catch(error =>{
                console.log(error);
            });
    }

    render() {
        let users = null;
        if (this.state.load){
            users = <Spinner/>;
        }else{
           users = this.state.users.map(item =>{
               return <User name={item.name} email={item.email}/>;
           })
        }

        return (
            <Aux>
                <Layout/>
                <br/><br/><br/>
                <div className="search-box">
                    <h3 className="text-center">Browse Users</h3>
                    <div className="text-center"><input name="text" className="search-input" type="text" value={this.state.searchQuery} onChange={this.searchHandler}/></div>
                    <div className="users">
                        <br/>
                        {users}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default SearchUsers;