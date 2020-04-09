import React from 'react';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';

class SelectedReportBlacklistUser extends React.Component { 

    renderUserName() {

        const {member} = this.props;

        return (
            <div className="blacklist-user-username">
                <div className="blacklist-user-username-text">
                    <span className="blacklist-user-name">{member.username}</span>
                    <span className="blacklist-user-discr-t">
                        #
                    </span>
                    <span className="blacklist-user-discr">
                        {member.discriminator}
                    </span>
                    {!member.nickname ? '' : 
                        <div className="blacklist-user-nick">({member.nickname})</div>
                    }
                </div>
                <div className="blacklist-user-id">
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
            <div className="blacklist-user-selected">
                <div className="blacklist-user-base">
                    <div className="blacklist-user-avatar">
                        <img src={member.effective_avatar} alt="selected user" />
                    </div>
                    {this.renderUserName()}
                </div>
                <div className="blacklist-user-body">
                    <DiscordRoleBlock memberRoles={member.roles}/>

                    <button className="button delete-report-blacklist" onClick={() => deleteCallback(member.id)}>
                        <i className="fas fa-trash-alt"></i>
                        Remove Blacklist
                    </button>
                </div>
            </div>
        );
    }
}

export default SelectedReportBlacklistUser;