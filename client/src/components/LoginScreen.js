import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ErrorPopup from './control-panel/generic/ErrorPopup';

const BACKGROUND_COUNT = 15;

class LoginScreen extends React.Component {


    getRandomBackground() {
        const id = Math.floor((Math.random() * BACKGROUND_COUNT) + 1);
        return `url(/img/bg/${id}.jpg)`;
    }

    showError() {
        if (this.props.auth.error) {
            return (
                <ErrorPopup errors={this.props.auth.error}/>
            );
        }
    }

    getCurrentPathString = () => {
        if (!this.props.location) return '';

        const rawPath = (this.props.location.pathname || '') + (this.props.location.search || '');
        const encodedPath = encodeURIComponent(rawPath);

        return encodedPath;
    };

    render() {
        return (
            <div className="login-outer-container" style={{backgroundImage: this.getRandomBackground()}}>
                <div className="outer-login-block">
                    <div className="login-block">
                        <div className="login-header">
                            <img className="logo" src="/img/logo_small.png" alt="logo"/>
                            <h3>Bot Manager</h3>
                            <h2>Login</h2>
                        </div>
                        <div className="login-body">
                            <a href={`/auth/discord?q=${this.getCurrentPathString()}`}>
                                <button className="button button-discord">
                                    <i className="fab fa-discord"></i> Login with Discord
                                </button>
                            </a>
                        </div>
                    </div>
                    {this.showError()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, {})(withRouter(LoginScreen));