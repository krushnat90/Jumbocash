import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { GoogleLogin } from 'react-google-login';
import UserService from '../../services/UserService';
import { refreshTokenSetup } from '../../utility/RefreshToken';
import { Card, CardContent, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LandingImage from '../../images/landing-page.jpg';

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

        console.log("name :: " + profileObj.name + " email :: " + profileObj.email + " token ::" + profileObj.token)
        let user = {
            name: profileObj.name,
            email: profileObj.email,
            token: profileObj.googleId
        }

        UserService.addOrUpdateUser(user).then(
            response => {
                refreshTokenSetup(authResponse);
                sessionStorage.setItem("JUMBO_USER_ID", response.data.userId);
                sessionStorage.setItem("JUMBO_USER_NAME", profileObj.name);
                sessionStorage.setItem("JUMBO_LOGIN_STATUS", true);
                console.log("session data :" + sessionStorage.getItem("JUMBO_USER_ID") + " " + sessionStorage.getItem("JUMBO_LOGIN_STATUS"));
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
        ).catch((err) => {this.onFailure()})
    }

    onFailure() {
        alert("Server is experiencing some issue. please try again later")
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
                <CssBaseline />

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Typography variant="h5" className="purple-color" noWrap>
                        <b>JUMBOTAIL CASHFLOW</b>
                    </Typography>
                    <Typography variant="subtitle1" className="coral-color" noWrap>
                        One place to track all your transactions.
                    </Typography>
                    <Grid item xs={12} sm={6}>
                        <img className="landing-image" src={LandingImage} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            onFailure={this.onFailure}
                            cookiePolicy={'single_host_origin'}
                            style={{ marginTop: '100px' }}
                            isSignedIn={true}
                            className="login-button"
                        />

                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default LoginButton;