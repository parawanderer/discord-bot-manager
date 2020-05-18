import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchPunishmentById, wipePunishmentById, fetchMember } from '../../../../action'


import PathFinder from '../../../../utils/PathFinder';
import NotFound from '../../shared/NotFound';
import Loading from '../../generic/Loading';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';
import Button from '../../generic/Button';
import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';
import Username from '../../generic/Username';
import ActiveState from '../../generic/ActiveState';


class PunishmentDetail extends React.Component { 

    state = {
        isLoading: false
    };

    _awaitingMembers = [];
    _notFound = false;

    componentDidMount() {
        const id = this.getID();
        this._awaitingMembers = [];

        if (!PathFinder.isValidPunishmentID(id)) return this._notFound = true;

        this.setState({isLoading : true});
        this.props.fetchPunishmentById(id)
            .then(() => {
                if (this.getPunishment() === null) {
                    this._notFound = true;
                } else {
                    // handle fetching relevant members for the punishment...
                    const punishment = this.getPunishment();
                    const fetchedUsers = [];

                    if (!this.hasMember(punishment.user_id)) {
                        this._awaitingMembers.push(punishment.user_id);
                        fetchedUsers.push(punishment.user_id);
                        this.props.fetchMember(punishment.user_id);
                    }
                    if (punishment.staff_id && punishment.staff_id !== 'system' // do not try to fetch system punishments or manual bans
                    && !this.hasMember(punishment.staff_id) && !fetchedUsers.includes(punishment.staff_id)) {
                        this._awaitingMembers.push(punishment.staff_id);
                        fetchedUsers.push(punishment.staff_id);
                        this.props.fetchMember(punishment.staff_id);
                    }
                    if (punishment.removed_by_id && (punishment.removed_by_id !== 'system') // do not try to fetch system unpunishments
                    && !this.hasMember(punishment.removed_by_id) && !fetchedUsers.includes(punishment.removed_by_id)) {
                        this._awaitingMembers.push(punishment.removed_by_id);
                        fetchedUsers.push(punishment.removed_by_id);
                        this.props.fetchMember(punishment.removed_by_id);
                    }
                    if (punishment.visible_modified_iD && (punishment.visible_modified_iD !== 'system') // do not try to fetch system wipes
                    && !this.hasMember(punishment.visible_modified_iD) && !fetchedUsers.includes(punishment.visible_modified_iD)) {
                        this._awaitingMembers.push(punishment.visible_modified_iD);
                        fetchedUsers.push(punishment.visible_modified_iD);
                        this.props.fetchMember(punishment.visible_modified_iD);
                    }
                }

                this.setState({isLoading: false});
            });
    }

    hasMember(id) {
        const {member_fetch_history} = this.props;
        return member_fetch_history.fetched_ids.includes(id);
    }

    getMember(id) {
        const {member_fetch_history} = this.props;
        return member_fetch_history.member_history[id];
    }

    getID() {
        return this.props.match.params.id;
    }

    getPunishment() {
        if (this.props.punishment_detail.id !== this.getID()) {
            return null;
        }
        return this.props.punishment_detail.data;
    }

    renderAvatar(member){
        if (!member.effective_avatar) {
            return (
                <div className="punishment-user-avatar no-avatar"/>
            );

        }
        return (
            <div className="punishment-user-avatar">
                <img src={member.effective_avatar} alt="selected user" />
            </div>
        );
    }

    renderUserName(member) {
        return (
            <div className="punishment-user-username">
                <div className="punishment-user-username-text">
                    <span className="punishment-user-name">{member.username}</span>
                    <span className="punishment-user-discr-t">
                        #
                    </span>
                    <span className="punishment-user-discr">
                        {member.discriminator}
                    </span>
                    {!member.nickname ? '' : 
                        <div className="punishment-user-nick">({member.nickname})</div>
                    }
                </div>
                <div className="punishment-user-id">
                    {member.id}
                </div>
            </div>
        );
    }

    renderFallbackUserInfo(punishment) {
        return(
            <React.Fragment>
                <div className="immortal-user-avatar no-avatar"/>
                <div className="punishment-user-username">
                    <div className="punishment-user-username-text">
                        <span className="punishment-user-name">{punishment.user_name}</span>
                        <span className="punishment-user-discr-t">
                            #
                        </span>
                        <span className="punishment-user-discr">
                            {punishment.user_discriminator}
                        </span>
                    </div>
                    <div className="punishment-user-id">
                        {punishment.user_id}
                    </div>
                    <div className="punishment-user-alert">
                        <div className="icon">
                            <i className="fad fa-info-square"></i>
                        </div>
                        <div className="inner-txt">
                            This user is not currently in the server! Their details (username or discriminator) may have changed since this punishment!
                            <br/><br/>
                            The displayed name and discriminator is the ones they had at the time they received this specific punishment
                            <br/><br/>
                            If they rejoin the server, their updated details will be displayed.
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }


    renderPunishedUser() {
        const {punishment_detail} = this.props;

        if (!punishment_detail) return null;

        const {user_id} = punishment_detail.data;

        let innerDetail;

        if (!this.hasMember(user_id)) {
            innerDetail = <Loading text=" "/>;
        } else {
            const member = this.getMember(user_id);

            if (member === null) {
                // not currently in guild
                innerDetail = this.renderFallbackUserInfo(punishment_detail.data);
            } else {
                innerDetail = (
                    <div className="punishment-det-user-container">
                        <div className="punishment-det-user-top">
                            {this.renderAvatar(member)}
                            {this.renderUserName(member)}
                        </div>
                        <div className="punishment-det-user-body">
                            <DiscordRoleBlock memberRoles={member.roles}/>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="punishment-det-user">
                {innerDetail}
                <div className="punishment-det-user-bottom">
                    <Link to={`/punishments?id=${user_id}`}>
                        <Button text="View Punishment History"/>
                    </Link>
                </div>
            </div>
        );
    }

    renderGenericInfoItem(title, data) {
        return (
            <div className="sidebar-info-item">
                <div className="sidebar-info-title">{title}</div>
                <div className="sidebar-info-data">{data}</div>
            </div>
        );
    }

    renderPunishmentType(punishment) {


        const type = PunishmentSeverityHelper.getPunishmentType(punishment.raw_type, true);
        const severity = PunishmentSeverityHelper.getPunishmentSeverity(punishment.severity, punishment.raw_type);

        return (
            <div className="punishment-main-type">
                {type}
                {severity}
            </div>
        );
    }

    renderIssuedBy(punishment) {

        let data;

        if (punishment.staff_id === null) {
            data = (
                <span className="punishment-issuer-name">
                    <i className="fas fa-question-circle"></i>
                    Manual Ban
                </span>
            );
        }
        else if (punishment.staff_id === "system") {
            data = (
                <span className="punishment-issuer-name">
                    <i className="fas fa-robot"></i>
                    System
                </span>
            );
        } else {
            if (this.hasMember(punishment.staff_id) && this.getMember(punishment.staff_id) !== null) {
                const member = this.getMember(punishment.staff_id);
                
                data = (
                    <React.Fragment>
                        <div className="inline-avatar-container">
                            <img src={member.effective_avatar} className="inline-avatar"/>
                        </div>
                        <Username username={member.username} discriminator={member.discriminator}/>
                        <span className="punishment-userid">
                            {punishment.staff_id}
                        </span>
                    </React.Fragment>
                );

            } else {
                if (this._awaitingMembers.includes(punishment.staff_id) && this.getMember(punishment.staff_id) !== null) {
                    // we will possibly still receive this member soon-ish
                    data = (
                        <React.Fragment>
                            <div className="inline-avatar-container no-avatar"/>
                            <span className="punishment-issuer-name">
                                {punishment.staff_name}
                            </span>
                            <span className="punishment-userid">
                                {punishment.staff_id}
                            </span>
                        </React.Fragment>
                    );
                } else {
                    data = (
                        <React.Fragment>
                            <span className="punishment-issuer-name">
                                {punishment.staff_name}
                            </span>
                            <span className="punishment-userid">
                                {punishment.staff_id}
                            </span>
                            <div className="inline-info">
                                <i className="fas fa-info-circle"></i>
                                This member is no longer in the server
                            </div>
                        </React.Fragment>
                    );
                }
            }
        }

        return (
            <div className="punishment-issuer">
                {data}
            </div>
        );
    }


    renderExpiration(punishment) {
        if (punishment.raw_type === 0) return null;
        // check if the punishment is still active?
        if (!punishment.active_state || !punishment.visible) return null;
        // check if punishment is permanent?
        if (punishment.duration === 0) {
            return this.renderGenericInfoItem("Expires", "Never");
        }
        else 
        {
            return this.renderGenericInfoItem("Expires", PunishmentSeverityHelper.getPunishmentTimestamp(punishment.timestamp + punishment.duration * 1000));
        }
    }

    renderRemovedBy(punishment) {

        let data;

        if (punishment.removed_by_id === "system") {
            data = (
                <span className="punishment-issuer-name">
                    <i className="fas fa-robot"></i>
                    System
                </span>
            );
        } else {
            if (this.hasMember(punishment.removed_by_id) && this.getMember(punishment.removed_by_id) !== null) {
                const member = this.getMember(punishment.removed_by_id);
                
                data = (
                    <React.Fragment>
                        <div className="inline-avatar-container">
                            <img src={member.effective_avatar} className="inline-avatar"/>
                        </div>
                        <Username username={member.username} discriminator={member.discriminator}/>
                        <span className="punishment-userid">
                            {punishment.removed_by_id}
                        </span>
                    </React.Fragment>
                );

            } else {
                if (this._awaitingMembers.includes(punishment.removed_by_id) && this.getMember(punishment.removed_by_id) !== null) {
                    // we will possibly still receive this member soon-ish
                    data = (
                        <React.Fragment>
                            <div className="inline-avatar-container no-avatar"/>
                            <span className="punishment-issuer-name">
                                {punishment.removed_by_name}
                            </span>
                            <span className="punishment-userid">
                                {punishment.removed_by_id}
                            </span>
                        </React.Fragment>
                    );
                } else {
                    data = (
                        <React.Fragment>
                            <span className="punishment-issuer-name">
                                {punishment.removed_by_name}
                            </span>
                            <span className="punishment-userid">
                                {punishment.removed_by_id}
                            </span>
                            <div className="inline-info">
                                <i className="fas fa-info-circle"></i>
                                This member is no longer in the server
                            </div>
                        </React.Fragment>
                    );
                }
            }
        }

        return (
            <div className="punishment-issuer">
                {data}
            </div>
        );
    }

    renderWipedBy(punishment) {

        let data;

        if (punishment.visible_modified_iD === "system") {
            data = (
                <span className="punishment-issuer-name">
                    <i className="fas fa-robot"></i>
                    System
                </span>
            );
        } else {
            if (this.hasMember(punishment.visible_modified_iD) && this.getMember(punishment.visible_modified_iD) !== null) {
                const member = this.getMember(punishment.visible_modified_iD);
                
                data = (
                    <React.Fragment>
                        <div className="inline-avatar-container">
                            <img src={member.effective_avatar} className="inline-avatar"/>
                        </div>
                        <Username username={member.username} discriminator={member.discriminator}/>
                        <span className="punishment-userid">
                            {punishment.visible_modified_iD}
                        </span>
                    </React.Fragment>
                );

            } else {
                if (this._awaitingMembers.includes(punishment.visible_modified_iD) && this.getMember(punishment.visible_modified_iD) !== null) {
                    // we will possibly still receive this member soon-ish
                    data = (
                        <React.Fragment>
                            <div className="inline-avatar-container no-avatar"/>
                            <span className="punishment-userid">
                                {punishment.visible_modified_iD}
                            </span>
                        </React.Fragment>
                    );
                } else {
                    data = (
                        <React.Fragment>
                            <span className="punishment-userid">
                                {punishment.visible_modified_iD}
                            </span>
                            <div className="inline-info">
                                <i className="fas fa-info-circle"></i>
                                This member is no longer in the server
                            </div>
                        </React.Fragment>
                    );
                }
            }
        }

        return (
            <div className="punishment-issuer">
                {data}
            </div>
        );
    }


    renderPunishmentAdditionalInfo(punishment) {
        let removalData = null;
        let wipeData = null;

        if (punishment.removed_by_id) {
            removalData = (
                <div className="punishment-info-removal">
                    <h3>Punishment Removed</h3>
                    {this.renderGenericInfoItem("When", PunishmentSeverityHelper.getPunishmentTimestamp(punishment.removed_timestamp))}
                    {this.renderGenericInfoItem("By", this.renderRemovedBy(punishment))}
                    {this.renderGenericInfoItem("For", punishment.removed_note)}
                </div>
            );
        }

        if (!punishment.visible) {
            wipeData = (
                <div className="punishment-info-removal">
                    <h3>Punishment Wiped</h3>
                    {this.renderGenericInfoItem("By", this.renderWipedBy(punishment))}
                </div>
            );
        }

        return (
            <React.Fragment>
                {removalData}
                {wipeData}
            </React.Fragment>
        );
    }


    renderPunishmentInfo() {
        const {punishment_detail} = this.props;
        if (!punishment_detail) return null;

        const punishment = punishment_detail.data;

        const duration = punishment.raw_type !== 0 
            ? this.renderGenericInfoItem("Duration", PunishmentSeverityHelper.timeToReadableString(punishment.duration)) 
            : null;

        return (
            <div className="punishment-info">
                <div className="punishment-info-top">
                    {this.renderPunishmentType(punishment)}
                </div>
                <div className="punishment-info-body">
                    {this.renderGenericInfoItem("Active State", <ActiveState active={punishment.active_state}/>)}
                    {this.renderGenericInfoItem("When", PunishmentSeverityHelper.getPunishmentTimestamp(punishment))}
                    {duration}
                    {this.renderExpiration(punishment)}
                    {this.renderGenericInfoItem("By", this.renderIssuedBy(punishment))}
                    {this.renderGenericInfoItem("For", punishment.staff_note)}

                    {this.renderPunishmentAdditionalInfo(punishment)}
                </div>
            </div>
        );
    }


    renderPunishmentDetail() {
        return (
            <div id="punishment-detail">
                <div className="left">
                    <div className="punishment-go-back">
                        <button className="punishment-go-back-btn" onClick={() => {
                            this.props.history.push('/punishments');
                        }}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="text">
                            Back to List
                        </div>
                    </div>
                    <h1 className="main-title">Punishment Detail</h1>
                    {this.renderPunishmentInfo()}
                </div>
                <div className="right">
                    <div className="punishment-det-top">
                        <h1>User Detail</h1>
                        {this.renderPunishedUser()}
                    </div>
                </div>
            </div>
        );
    }


    render() {
        if (this._notFound) return <NotFound/>;
        if (this.state.isLoading) return <Loading/>;

        return this.renderPunishmentDetail();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        punishment_detail: state.punishment_detail,
        member_fetch_history: state.member_fetch_history
    }
};

export default connect(mapStateToProps , {fetchPunishmentById, wipePunishmentById, fetchMember})(withRouter(PunishmentDetail));