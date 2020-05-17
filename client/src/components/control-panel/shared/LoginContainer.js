import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from '../../LoginScreen';


class LoginContainer extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <Route path="/" component={LoginScreen} />
            </BrowserRouter>
        );
    }
}

export default LoginContainer;