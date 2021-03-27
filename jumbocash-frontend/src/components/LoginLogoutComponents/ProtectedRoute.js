
import React from 'react'
import { Redirect } from 'react-router-dom'

import LoginButton from './LoginButton';



class ProtectedRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const Component = this.props.component;

        let userId = '';
        let userName = '';

        if (sessionStorage.getItem('JUMBO_LOGIN_STATUS')) {
            userId = sessionStorage.getItem('JUMBO_USER_ID');
            userName = sessionStorage.getItem('JUMBO_USER_NAME');
        }

        console.log("PROTECTED user ID:: " + userId);

        return userId > 0 ? (
            <Component userId={userId} userName={userName} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
            // <LoginButton />
        );
    }
}

export default ProtectedRoute;