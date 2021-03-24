import { DashboardTwoTone } from '@material-ui/icons';
import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginButton from './LoginButton';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        
        const isAuthenticated = true;
        
        console.log(Component.isAuthenticated)
        if(Component.state){
            isAuthenticated = true;
        }
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;