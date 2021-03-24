import { DashboardTwoTone } from '@material-ui/icons';
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

        if (this.props.location.state) {
            userId = this.props.location.state.userId;
        }

        console.log("PROTECTED user ID:: " + userId);

        return userId > 0 ? (
            <Component userId={userId} userName={this.props.location.state.name} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;