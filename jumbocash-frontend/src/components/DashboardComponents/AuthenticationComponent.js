import React, { Component } from "react";
import { Spinner } from 'react-bootstrap';
import { Redirect } from "react-router";


class AuthenticationComponent extends Component {

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
        if (this.props.history.location.state) {
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
            return (<Redirect to={'/'} />)
        }
        else {

            if (this.state.isLoading) {
                return (<Spinner />);
            }
            else {
                return (<div>
                </div>);
            }
        }
    }

}

export default AuthenticationComponent;