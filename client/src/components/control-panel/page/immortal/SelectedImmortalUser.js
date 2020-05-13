import React from 'react';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';

class SelectedImmortalUser extends React.Component { 

    renderUserName() {

        const {member} = this.props;

        return (
            <div className="immortal-user-username">
                <div className="immortal-user-username-text">
                    <span className="immortal-user-name">{member.username}</span>
                    <span className="immortal-user-discr-t">
                        #
                    </span>
                    <span className="immortal-user-discr">
                        {member.discriminator}
                    </span>
                    {!member.nickname ? '' : 
                        <div className="immortal-user-nick">({member.nickname})</div>
                    }
                </div>
                <div className="immortal-user-id">
                    {member.id}
                </div>
            </div>
        );
    }

    render() {
        // this.props.member
        // this.props.deleteCallback

        if (!this.props.member) return null;

        const {member, deleteCallback} = this.props;

        return (
            <div className="immortal-user-selected">
                <div className="immortal-user-base">
                    <div className="immortal-user-avatar">
                        <img src={member.effective_avatar} alt="selected user" />
                    </div>
                    {this.renderUserName()}
                </div>
                <div className="immortal-user-body">
                    <DiscordRoleBlock memberRoles={member.roles}/>

                    <button className="button delete-report-immortal" onClick={() => deleteCallback(member.id)}>
                        <i className="fas fa-unlink"></i>
                        Unlink Immortal
                    </button>
                </div>
            </div>
        );
    }
}

export default SelectedImmortalUser;