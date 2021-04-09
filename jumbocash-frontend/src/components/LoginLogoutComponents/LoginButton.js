import React, { Component } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { GoogleLogin } from 'react-google-login';
import UserService from '../../services/UserService';
import { refreshTokenSetup } from '../../utility/RefreshToken';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import LandingImage from '../../images/landing-page6.jpg';
import JumbotailLogo from '../../images/jumbotail-logo.png';

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
        sessionStorage.setItem("JUMBO_TOKEN_ID", authResponse.tokenId);

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
        ).catch((err) => { this.onFailure() })
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
        }

        return (
            <div className="row">
                <CssBaseline />
                <div className="column column-bg-color">
                    <Grid
                        container
                        spacing={3}
                        //direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item xs={12} sm={12}>
                            <img src={JumbotailLogo} />
                            <br />
                            <br />
                            <div className = "container">
                            <Typography variant="h6" className="white-color">
                                Cash Flow Management Application to track all expenses!
                            </Typography>
                            </div>
                            <br />
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={this.onFailure}
                                cookiePolicy={'single_host_origin'}
                                style={{ marginTop: '100px', borderRadius :'25px'}}
                                isSignedIn={true}
                                className="login-button"
                            />

                        </Grid>
                    </Grid>
                </div>
                <div className="column">
                    <Grid
                        container
                        spacing={3}
                        //direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >

                        <Grid item xs={12} sm={12}>
                            <img className="landing-image" src={LandingImage} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

}

export default LoginButton;