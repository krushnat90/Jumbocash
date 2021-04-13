import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =process.env.REACT_APP_GOOGLE_CLIENT_ID;

class LogoutButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess() {
        sessionStorage.removeItem('JUMBO_USER_ID');
        sessionStorage.removeItem('JUMBO_USER_NAME');
        sessionStorage.removeItem('JUMBO_LOGIN_STATUS');
        this.props.history.push({
            pathname: '/'
        })
    }

    onFailure() {

    }

    render() {

        return (
            <div>
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={this.onSuccess}
                ></GoogleLogout>
            </div>
        )
    }

}

export default LogoutButton