import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'undefined',
            email : '',
            isAuthenticated : false,
            isLoading : true
        }
    }

    componentDidMount(){
        if (this.props.history.location.state)
        {
            //console.log("DASHBOARD " + this.props.history.location.state.name);
            console.log("LOADING " + this.state.isLoading);
            this.setState({
                name : this.props.history.location.state.name,
                isLoading : false,
                isAuthenticated : this.props.history.location.state.isAuthenticated,
            });
        } 
    }

    render() {
        
        if(this.state.isLoading){
            return ( <Spinner /> );
        }else {
            return ( <h1>Hello, {this.state.name}</h1> );
        }

    }

}

export default Dashboard;