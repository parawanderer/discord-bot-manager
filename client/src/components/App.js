import React from 'react';
import { connect } from 'react-redux';

import ControlPanelContainer from './control-panel/shared/ControlPanelContainer';
import Loading from './control-panel/generic/Loading';
import LoginContainer from './control-panel/shared/LoginContainer';

import { fetchLoginStatus } from '../action';

// css is not in the static folder to allow it to be compiled and minified by the build process
import '../css/main.css';




const POLLING_RATE_MS = 1000 * 30; // 30 seconds

class App extends React.Component {

    
    state = { loggedIn : null };


    pollLoginStatus = async () => {
        await this.props.fetchLoginStatus();

        // update if our status updated, forcing a redraw of app, 
        // forcing a login screen to re-appear if we got logged out
        // or making the control pannel appear if we logged in on a 
        // different tab or we logged in as a different user in a different tab

        if (this.state.loggedIn !== this.props.auth.loggedIn)
            this.setState({loggedIn : this.props.auth.loggedIn}); // this is set to essentially force a redraw of the entire app
    };

    componentDidMount = async () => {
        await this.props.fetchLoginStatus();  

        if (this.state.loggedIn !== this.props.auth.loggedIn)
            this.setState({loggedIn : this.props.auth.loggedIn}); // this is set to essentially force a redraw of the entire app

        // setup polling to ping API endpoint to ensure we are still logged in (session not expired)
        // once it is expired, we will throw ourselves back to the login screen.
        setInterval(this.props.fetchLoginStatus, POLLING_RATE_MS);
    };

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
            return <ControlPanelContainer/>;
        }
        // show login screen
        return (
            <LoginContainer/>
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