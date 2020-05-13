import React from 'react';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';

class SelectedImmortalUser extends React.Component { 

    renderAvatar() {
        const {member} = this.props.immortal;
        if (!member.effective_avatar) {
            return (
                <div className="immortal-user-avatar no-avatar"/>
            );

        }
        return (
            <div className="immortal-user-avatar">
                <img src={member.effective_avatar} alt="selected user" />
            </div>
        );
    }

    renderUserName() {

        const {member, discord_id} = this.props.immortal;

        if (!member) {
            return (
            <div className="immortal-user-username">
                <div className="immortal-user-id">
                    {discord_id}
                </div>
            </div>
            );
        }

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

    renderMinecraftInfoBlock() {
        const {minecraft_info, minecraft_uuid} = this.props.immortal;

        if (!minecraft_info) {
            // no minecraft info
            return (
                <div className="immortal-user-info">
                    <div className="sidebar-info-item">
                        <span className="sidebar-info-title">
                            Minecraft UUID
                        </span>
                        <span className="sidebar-info-data">
                            <span className="info-id mc-id">
                                {minecraft_uuid}
                            </span>
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div className="immortal-user-info">
                <div className="sidebar-info-item">
                    <span className="sidebar-info-title">
                        Minecraft UUID
                    </span>
                    <span className="sidebar-info-data">
                        <span className="info-id mc-id">
                            {minecraft_uuid}
                        </span>
                    </span>
                </div>
                <div className="sidebar-info-minecraft-block">
                    <div className="mc-head">
                        {   
                            minecraft_info.hasSkin ?
                            <img src={minecraft_info.skin} alt={`${minecraft_info.name}'s Minecraft Skin`}/>
                            :
                            <img src={'/img/steve.png'} alt={`${minecraft_info.name}'s Minecraft Skin`}/>
                        }
                    </div>
                    <div className="mc-name">
                        {minecraft_info.name}
                    </div>
                </div>
            </div>
        );
    }


    render() {
        // this.props.member
        // this.props.deleteCallback
        const { immortal, deleteCallback } = this.props;

        if (!immortal) return null;

        const {member} = immortal;

        return (
            <div className="immortal-user-selected">
                <div className="immortal-user-base">
                    {this.renderAvatar()}
                    {this.renderUserName()}
                </div>
                <div className="immortal-user-body">
                    {this.renderMinecraftInfoBlock()}
                    <DiscordRoleBlock memberRoles={member.roles}/>

                    <button 
                        className="button delete-report-immortal" 
                        onClick={() => deleteCallback(immortal.discord_id)}
                        disabled={!immortal.active}
                    >
                        <i className="fas fa-unlink"></i>
                        Unlink Immortal
                    </button>
                </div>
            </div>
        );
    }
}

export default SelectedImmortalUser;