
import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const Component = this.props.component;

        let userId = '';
        let userName = '';

        if (sessionStorage.getItem('JUMBO_LOGIN_STATUS')) {
            userId = sessionStorage.getItem('JUMBO_USER_ID');
            userName = sessionStorage.getItem('JUMBO_USER_NAME');
        }

        return userId > 0 ? (
            <Component userId={userId} userName={userName} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;