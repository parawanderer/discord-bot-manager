import React from 'react';
import { connect } from 'react-redux';

import LoginScreen from './LoginScreen';
import ControlPanelContainer from './control-panel/shared/ControlPanelContainer';

import { fetchLoginStatus } from '../action';


import Loading from './control-panel/generic/Loading';


const POLLING_RATE_MS = 1000 * 30; // 30 seconds

class App extends React.Component {

    state = { loggedIn : null };


    pollLoginStatus = async () => {
        await this.props.fetchLoginStatus();

        // update if our status updated, forcing a redraw of app, 
        // forcing a login screen to re-appear if we got logged out
        // or making the control pannel appear if we logged in on a 
        // different tab or we logged in as a different user in a different tab

        if (this.state.loggedIn != this.props.auth.loggedIn)
            this.setState({loggedIn : this.props.auth.loggedIn}); // this is set to essentially force a redraw of the entire app
    };

    componentDidMount() {
        this.props.fetchLoginStatus();  

        // setup polling to ping API endpoint to ensure we are still logged in (session not expired)
        // once it is expired, we will throw ourselves back to the login screen.
        setInterval(this.props.fetchLoginStatus, POLLING_RATE_MS);
    }    

    drawPage() {
        if (!this.props.auth) {
            return (
                <div className="app-load">
                    <Loading />
                </div>
            );
        }

        // if not logged in, show login screen, else show dashboard.

        if (this.props.auth.loggedIn) {
            this.state.loggedIn = true; // preset this each time we render so we can compare against it properly in pollLoginStatus
            return <ControlPanelContainer/>;
        }
        // show login screen
        this.state.loggedIn = false; // preset this each time we render so we can compare against it properly in pollLoginStatus
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