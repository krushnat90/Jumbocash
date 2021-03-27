import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            isAuthenticated: false,
            isLoading: false,
            userId: ''
        }
    }

    componentDidMount() {
        console.log('here i am');
        if (this.props.history.location.state) {
            //console.log("DASHBOARD " + this.props.history.location.state.name);
            console.log("LOADING " + this.state.isLoading);
            console.log("UserID  " + this.props.history.location.state.userId)
            this.setState({
                name: this.props.history.location.state.name,
                isLoading: false,
                isAuthenticated: this.props.history.location.state.isAuthenticated,
                userId: this.props.history.location.state.userId
            });

            
        }

        
    }

    render() {
        if (!sessionStorage.getItem('JUMBO_LOGIN_STATUS')) {
            console.log("dashboard redirect")
            return (<Redirect to={'/'} />)
        }
        else {

            if (this.state.isLoading) {
                return (<Spinner />);
            }
            else {
                return (<h1>Hello, {this.state.name}</h1>);
            }
        }
    }

}

export default Dashboard;