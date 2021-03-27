import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import UserService from '../../services/UserService';
import { refreshTokenSetup } from '../../utility/RefreshToken';
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

    onSuccess(authResponse) {
        var profileObj = authResponse.profileObj;

        console.log("name :: "+profileObj.name+" email :: "+profileObj.email+" token ::"+profileObj.token)
        let user = {
            name: profileObj.name,
            email: profileObj.email,
            token: profileObj.googleId
        }

        UserService.addOrUpdateUser(user).then(
            response => {
                refreshTokenSetup(authResponse);
                sessionStorage.setItem("JUMBO_USER_ID",response.data.userId);
                sessionStorage.setItem("JUMBO_USER_NAME",profileObj.name);
                sessionStorage.setItem("JUMBO_LOGIN_STATUS",true);
                console.log("session data :"+sessionStorage.getItem("JUMBO_USER_ID")+" "+sessionStorage.getItem("JUMBO_LOGIN_STATUS"));
                this.props.history.push({
                    pathname: '/dashboard',
                    state: {
                        name: profileObj.name,
                        email: profileObj.email,
                        userId: response.data.userId,
                        isAuthenticated: true
                    }
                })
            }
        ).catch(this.onFailure())
    }

    onFailure() {
        this.props.history.push({
            pathname: '/'
        })
    }

    render() {
        const responseGoogle = (response) => {
            
            this.onSuccess(response);
            console.log(response);
        }

        return (

            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{ marginTop: '100px' }}
                    isSignedIn={true}
                />
            </div>
        )
    }

}

export default LoginButton;