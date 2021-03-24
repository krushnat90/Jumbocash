import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import DrawerComponent from '../Navbar/DrawerComponent';

const clientId = '193599941937-401iftc6u6hb3b92l27fvc80fomasg22.apps.googleusercontent.com';

class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess(profileObj){
        this.props.history.push({
            pathname: '/dashboard',
            state: {
                name : profileObj.name,
                email : profileObj.email,
                isAuthenticated : true
            }
        })
    }

    onFailure(){
        this.props.history.push({
            pathname: '/'
        })
    }

    render() {
        const responseGoogle = (response) => {
            var profileObj = response.profileObj;
            this.onSuccess(profileObj);
            console.log(response);
        }

        return (
            <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={false}
            />
            </div>
        )
    }
    
}

export default LoginButton;