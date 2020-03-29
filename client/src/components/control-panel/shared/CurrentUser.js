import React from 'react';
import { connect } from 'react-redux';


const DEFAULT_AVATAR = "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png";

class CurrentUser extends React.Component {

    getUsername() {
        return this.props.auth.user.username;
    }

    getAvatar() {
        if (this.props.auth.user.avatar) {
            return <img src={`https://cdn.discordapp.com/avatars/${this.props.auth.user.adminUID}/${this.props.auth.user.avatar}`}
                        alt="user"
                        className="avatar"     
                    />;
        }
        return <img src={DEFAULT_AVATAR} alt="user" className="avatar" />;
    }

    render() {
        return (
            <div className="user">
                {this.getAvatar()}
                <div className="username">{this.getUsername()}</div>
                <a href="/api/logout">
                    <div className="sign-out">
                        <i className="fad fa-sign-out"></i>
                    </div>
                </a>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) =>  {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, {})(CurrentUser);