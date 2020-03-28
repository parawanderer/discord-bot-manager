import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginScreen from './LoginScreen';

import { fetchLoginStatus } from '../action';

// if not logged in, show login screen, else show dashboard.

class App extends React.Component {

    componentDidMount() {
        this.props.fetchLoginStatus()
    }    

    drawPage() {
        console.log(this.props);
        if (!this.props.auth) {
            return (
                <div className="test">
                    <p>Loading...</p>
                </div>
            );
        }

        if (this.props.auth.loggedIn) {
            return (
                <div className="test2">
                    Logged in as: {this.props.auth.user.adminUID}<br/>
                    Super Admin: {this.props.auth.user.isSuperAdmin ? "true" : "false"}<br/><br/>
                    <a href="/api/logout">Logout</a>
                </div>
            );
        }
        // show login screen
        return (
            <LoginScreen />
        );
    }

    render() {
        return this.drawPage();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { fetchLoginStatus })(App);