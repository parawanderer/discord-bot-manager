import React from 'react';

import { connect } from 'react-redux';

import { fetchMember } from '../../../../action';
import Loading from '../../generic/Loading';
import DiscordRoleBlock from '../../generic/DiscordRoleBlock';
import { Link } from 'react-router-dom';
import ActiveState from '../../generic/ActiveState';
import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';


class PunishmentCurrentDetail extends React.Component { 

    state = {
        scrollStick : false
    };

    _lastFetchedUser = null;
    _mainContainerElement = null;
    _topElement = null;
    _windowHeight = null;
    _stickStrollOffset = 0;
    _selfElement = null;

    componentDidMount() {
        if (window.innerWidth > 1023) {
            this._mainContainerElement = document.getElementById("main-container");
            this._topElement = document.getElementById("top");
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
        if (!this.props.shouldScroll) return;

        const scrollTop = this._mainContainerElement.scrollTop;
        const tenPercentOfHeight = this._windowHeight / 10;
        let maxScroll = (this._topElement.offsetTop + this._topElement.clientHeight * 3) - tenPercentOfHeight;
    
        if (scrollTop > maxScroll) {
            if (!this._selfElement || (this._selfElement.clientHeight + this._stickStrollOffset) <= this._mainContainerElement.scrollHeight- 200) {
                this._stickStrollOffset = scrollTop - maxScroll + (tenPercentOfHeight /2);
                this.setState({scrollStick: true});
            } else {
                this._stickStrollOffset = this._mainContainerElement.scrollHeight - this._selfElement.clientHeight - 200;
                this.setState({scrollStick: true});
            }
        } else {
            this.setState({scrollStick: false});
        }
    };


    getMemberByID = (id) => {
        const {member_history} = this.props.member_fetch_history;
        return member_history[id];
    };

    renderAvatar(member){
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

    renderFallbackUserInfo() {
        const {punishment} = this.props;

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
                            <br/>
                            If they rejoin the server, their updated details will be displayed.
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }

    renderDiscordUserInfo() {
        const {punishment, member_fetch_history} = this.props;

        if (!member_fetch_history.fetched_ids.includes(punishment.user_id)) {

            if (this._lastFetchedUser !== punishment.user_id) {
                this._lastFetchedUser = punishment.user_id;
                this.props.fetchMember(punishment.user_id);
            }
            return <Loading text=" "/>;
        }

        const member = this.getMemberByID(punishment.user_id);

        if (member === null) {
            // this member could not be fetched (left guild?)
            return (
                <div className="punishment-user-base">
                    {this.renderFallbackUserInfo()}
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="punishment-user-base">
                        {this.renderAvatar(member)}
                        {this.renderUserName(member)}
                    </div>
                    <div className="punishment-user-body">
                        <DiscordRoleBlock memberRoles={member.roles}/>
                    </div>
                </React.Fragment>
            );
        }
    }

    renderGenericInfoItem(title, data) {
        return (
            <div className="sidebar-info-item">
                <div className="sidebar-info-title">{title}</div>
                <div className="sidebar-info-data">{data}</div>
            </div>
        );
    }

    renderUnpunisher() {
        const {punishment} = this.props;

        let data;

        if (punishment.removed_by_id === null) {
            data = null;
        }
        else if (punishment.removed_by_id === "system") {
            data = (
                <span className="punishment-issuer-name">
                    <i className="fas fa-robot"></i>
                    System
                </span>
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
                </React.Fragment>
            );
        }

        return (
            <div className="punishment-remover">
                {data}
            </div>
        );
    }

    renderPunisher() {
        const {punishment} = this.props;

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
            data = (
                <React.Fragment>
                    <span className="punishment-issuer-name">
                        {punishment.staff_name}
                    </span>
                    <span className="punishment-userid">
                        {punishment.staff_id}
                    </span>
                </React.Fragment>
            );
        }

        return (
            <div className="punishment-issuer">
                {data}
            </div>
        );
    }


    renderPunishmentType() {

        const { punishment } = this.props;
        
        const type = PunishmentSeverityHelper.getPunishmentType(punishment.raw_type, true);
        const severity = PunishmentSeverityHelper.getPunishmentSeverity(punishment.severity, punishment.raw_type);

        return (
            <div className="punishment-main-type">
                {type}
                {severity}
            </div>
        );
    }

    renderPunishmentAdditionalInfo() {

        const {punishment} = this.props;

        let removalData = null;
        let wipeData = null;

        if (punishment.removed_by_id) {
            removalData = (
                <div className="punishment-removal-info">
                    {this.renderGenericInfoItem("Removed By", this.renderUnpunisher())}
                    {this.renderGenericInfoItem("Removed At", PunishmentSeverityHelper.getPunishmentTimestamp(punishment.removed_timestamp))}
                    {this.renderGenericInfoItem("Removed For", punishment.removed_note)}
                </div>
            );
        }

        if (!punishment.visible) {
            wipeData = (
                <div className="punishment-wipe-info">
                    {this.renderGenericInfoItem("Wiped By", 
                    punishment.visible_modified_iD !== 'system'
                     ? <div className="punishment-userid">{punishment.visible_modified_iD}</div>
                     : <span className="punishment-issuer-name"><i className="fas fa-robot"></i> System</span>
                    )}
                </div>
            );
        }

        return (<React.Fragment>
            {removalData}
            {wipeData}
        </React.Fragment>);
    }

    renderPunishmentDetail() {

        const {punishment} = this.props;

        return(
            <div className="punishment-selected-detail">
                <div className="view-punishment-block">
                    <div className="view-punishment-text">
                        View Details
                    </div>
                    <Link to={`/punishments/punishment/${punishment.id}`}>
                        <button className="view-punishment">
                            <i className="far fa-angle-right"></i>
                        </button>
                    </Link>
                </div>
                <h3>Punishment #{punishment.id}</h3>
                <div className="punishment-selected-detail-inner">
                    {this.renderPunishmentType()}
                    
                    {this.renderGenericInfoItem("Active State", <ActiveState active={punishment.active_state}/>)}

                    {this.renderGenericInfoItem("By", this.renderPunisher())}

                    {this.renderGenericInfoItem("When", PunishmentSeverityHelper.getPunishmentTimestamp(punishment))}

                    {this.renderGenericInfoItem("For", punishment.staff_note)}

                    {this.renderPunishmentAdditionalInfo()}
                </div>
            </div>
        );
    }

    render() {

        if (!this.props.punishment) return null;

        return (
            <div className={"punishment-selected" + (this.state && this.state.scrollStick ? " stick" : "")}
                style={this.state && this.state.scrollStick && this.props.shouldScroll ? {transform: `translateY(${this._stickStrollOffset}px)`} : {transform: `translateY(0px)`}}
                ref={div => {
                    this._selfElement = div
                }}
            >   
                <div className="punishment-selected-user">
                    {this.renderDiscordUserInfo()}
                </div>
                {this.renderPunishmentDetail()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        member_fetch_history: state.member_fetch_history
    };
};

export default connect(mapStateToProps, { fetchMember })(PunishmentCurrentDetail);