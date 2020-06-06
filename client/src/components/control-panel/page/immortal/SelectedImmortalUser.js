import React from 'react';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';
import Button from '../../generic/Button';

class SelectedImmortalUser extends React.Component { 

    _mainContainerElement = null;
    _fullListElement = null;
    _windowHeight = null;
    _stickStrollOffset = 0;

    componentDidMount() {
        if (window.innerWidth > 1023) {
            this._mainContainerElement = document.getElementById("main-container");
            this._fullListElement = document.getElementById("immortal-list");
            this._windowHeight = window.innerHeight;
            this._mainContainerElement.addEventListener('scroll', this.handleScroll, { passive: true })
        }
    }

    componentWillUnmount() {
        if (window.innerWidth > 1023) {
            this._mainContainerElement.removeEventListener('scroll', this.handleScroll)
        }
    }

    handleScroll = (event) => {
        const scrollTop = this._mainContainerElement.scrollTop;
        const tenPercentOfHeight = this._windowHeight / 10;
        const maxScroll = this._fullListElement.offsetTop - tenPercentOfHeight;
        if (scrollTop > maxScroll) {
            this._stickStrollOffset = scrollTop - maxScroll;
            this.setState({scrollStick: true});
        } else {
            this.setState({scrollStick: false});
        }
    };

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

    renderUserInfoBlock() {
        const {minecraft_info, minecraft_uuid, website_id} = this.props.immortal;

        if (!minecraft_info) {
            // no minecraft info
            return (
                <div className="immortal-user-info">
                    <div className="sidebar-info-item">
                        <div className="sidebar-info-title">
                            Website ID
                        </div>
                        <div className="sidebar-info-data">
                            {website_id}
                        </div>
                    </div>
                    <div className="sidebar-info-item">
                        <div className="sidebar-info-title">
                            Minecraft UUID
                        </div>
                        <div className="sidebar-info-data">
                            <div className="info-id mc-id">
                                {minecraft_uuid}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="immortal-user-info">
                <div className="sidebar-info-item">
                    <div className="sidebar-info-title">
                        Website ID
                    </div>
                    <div className="sidebar-info-data">
                        {website_id}
                    </div>
                </div>
                <div className="sidebar-info-item">
                    <div className="sidebar-info-title">
                        Minecraft UUID
                    </div>
                    <div className="sidebar-info-data">
                        <div className="info-id mc-id">
                            {minecraft_uuid}
                        </div>
                    </div>
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


    renderInnerDetails() {
        const {immortal} = this.props;
        const {member} = immortal;
        
        if (member) {
            return (
                <React.Fragment>
                    <div className="immortal-user-base">
                        {this.renderAvatar()}
                        {this.renderUserName()}
                    </div>
                    <div className="immortal-user-body">
                        {this.renderUserInfoBlock()}
                        <DiscordRoleBlock memberRoles={member.roles}/>

                        <Button     
                            classes="button delete-immortal" 
                            onClick={() => deleteCallback(immortal.discord_id)}
                            disabled={!immortal.active}
                            icon={<i className="fas fa-unlink"></i>}
                            text={"Unlink Immortal"}
                        />

                        <a href={`https://www.mineplex.com/admin.php?users/${immortal.website_id}/edit`} target="_blank" rel="noopener noreferrer">
                            <Button     
                                classes="button edit-website" 
                                icon={<i className="fas fa-edit"></i>}
                                text={"Edit Web User"}
                            />
                        </a>

                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <div className="immortal-user-body">
                    <div className="immortal-user-base no-member">
                        Member not currently in the server
                    </div>
                    {this.renderUserInfoBlock()}
                    <Button     
                        classes="button delete-immortal" 
                        onClick={() => deleteCallback(immortal.discord_id)}
                        disabled={!immortal.active}
                        icon={<i className="fas fa-unlink"></i>}
                        text={"Unlink Immortal"}
                    />

                    <a href={`https://www.mineplex.com/admin.php?users/${immortal.website_id}/edit`} target="_blank" rel="noopener noreferrer">
                        <Button     
                            classes="button edit-website" 
                            icon={<i className="fas fa-edit"></i>}
                            text={"Edit Web User"}
                        />
                    </a>

                </div>
            </React.Fragment>
        );

    }


    render() {
        // this.props.member
        // this.props.deleteCallback
        const { immortal, deleteCallback } = this.props;

        if (!immortal) return null;

        const {member} = immortal;

        return (
            <div className={"immortal-user-selected" + (this.state && this.state.scrollStick ? " stick" : "")}
                style={this.state && this.state.scrollStick ? {transform: `translateY(${this._stickStrollOffset}px)`} : undefined}
            >
                <div className="immortal-user-base">
                    {this.renderAvatar()}
                    {this.renderUserName()}
                </div>
                <div className="immortal-user-body">
                    {this.renderUserInfoBlock()}
                    <DiscordRoleBlock memberRoles={member.roles}/>

                    <Button     
                        classes="button delete-immortal" 
                        onClick={() => deleteCallback(immortal.discord_id)}
                        disabled={!immortal.active}
                        icon={<i className="fas fa-unlink"></i>}
                        text={"Unlink Immortal"}
                    />

                    <a href={`https://www.mineplex.com/admin.php?users/${immortal.website_id}/edit`} target="_blank" rel="noopener noreferrer">
                        <Button     
                            classes="button edit-website" 
                            icon={<i className="fas fa-edit"></i>}
                            text={"Edit Web User"}
                        />
                    </a>

                </div>
            </div>
        );
    }
}

export default SelectedImmortalUser;