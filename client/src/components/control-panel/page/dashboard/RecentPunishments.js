import React from 'react';
import { connect } from "react-redux";
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

import Loading from '../../generic/Loading';

import { fetchRecentPunishments } from '../../../../action/index';


const RECENT_PUNISHMENT_NUM = 6;

class RecentPunishments extends React.Component {

    componentDidMount() {
        this.props.fetchRecentPunishments();
    }

    renderInviteLinks() {
        const invites = this.props.guild.invites.map((invite, index) => 
            { 
                return (
                    <li key={invite}>
                        <a href={invite}>Invite #{index}</a>
                    </li>
                ); 
            });
        return <ul>{invites}</ul>;
    }

    getPunishment(rawType) {
        switch(rawType) {
            case 1:
                return (<div className="punishment-type">
                            <i className="fad fa-microphone-alt-slash"></i>
                        </div>);

            case 2:
                return (<div className="punishment-type">
                        <i className="fad fa-ban"></i>
                    </div>);
            default:
                return (
                    <div className="punishment-type">
                        <i className="fad fa-exclamation-circle"></i>
                    </div>);
        }
    }

    getSeverity(severity, rawType) {
        if (severity === "0") {
            if (rawType !== 0) {
                return (
                    <div className="punishment-severity perm">
                        PERM
                    </div>
                );
            }
            return null;
        }
        return (
            <div className={`punishment-severity sev${severity}`}>
                {severity}
            </div>
        );
    }

    getPunishmentReason(staffNote) {
        return (<div className="punishment-for">
                <div className="punishment-for-prefix">FOR</div>
                <div className="punishment-reason">
                    {staffNote}
                </div>
            </div>);
    }

    getPunishmentIssuer(staffName) {
        return (
            <div className="punishment-by">
                <div className="punishment-by-prefix">BY</div>
                <div className="punishment-reason">
                    {staffName}
                </div>
            </div>
        );
    }

    getActiveState(activeState) {
        if (activeState) {
            return (
                <div className="punishment-active-state punishment-active">
                    <i className="fas fa-check"></i>
                    Active
                </div>
            );
        }
        return (
            <div className="punishment-active-state punishment-inactive">
                <i className="fas fa-slash"></i>
                Inactive
            </div>
        );

    }

    getUsername(punishment) {
        return (
            <div className="punishment-username">
                {punishment.user_name}
                <span className="discriminator-split">#</span>
                <span className="discriminator">{punishment.user_discriminator}</span>
            </div>
        );
    }

    getTimestamp(punishment) {

        return (
            <div className="punishment-time">
                <div className="punishment-time-prefix">WHEN</div>
                <div className="punishment-reason">
                {dateFormat(new Date(punishment.timestamp), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                </div>
            </div>
        );
    }

    getID(punishment) {
        return (
            <Link to={`/punishments/punishment/${punishment.id}`}>
                <div className="punishment-id">
                    #{punishment.id}
                </div>
            </Link>
        );
    }


    renderIndividualPunishment(punishment) {
        
        const id = this.getID(punishment);

        const activeState = this.getActiveState(punishment.active_state);

        const time = this.getTimestamp(punishment);

        const type = this.getPunishment(punishment.raw_type);

        const severity = this.getSeverity(punishment.severity, punishment.raw_type);

        const username = this.getUsername(punishment);

        const forBlock = this.getPunishmentReason(punishment.staff_note);

        const byBlock = this.getPunishmentIssuer(punishment.staff_name);


        return (<div className={`punishment ${!punishment.visible ? 'hidden' : ''}`}>
                {id}
                {type}
                {severity}
                {username}
                {activeState}
                {byBlock}
                {time}
                {forBlock}
            </div>)
        ;

    }

    renderRecentPunishments() {
        if (!this.props.recent_punishments) {
            return <Loading text="Loading Punishments..." />;
        }
        const first10 = [];
        const limit = this.props.recent_punishments.fetched > RECENT_PUNISHMENT_NUM ? RECENT_PUNISHMENT_NUM : this.props.recent_punishments.fetched;

        for (let i = 0; i < limit; i++) {
            let punishment = this.props.recent_punishments.punishments[i];

            first10.push(
                <li key={punishment.id}>
                    {this.renderIndividualPunishment(punishment)}
                </li>
            );
        }

        return <ul>{first10}</ul>;
    }

    render() {
        return (
            <div className="recent-punishments">
            <Link to="/punishments">
                <div className="view-more">
                    View More 
                    <i className="fas fa-chevron-right"></i>
                </div>
            </Link>
            <h3 className="block-title">Recent Punishments</h3>
            <div className="punishment-list">
                    {this.renderRecentPunishments()}
            </div>
        </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        recent_punishments: state.recent_punishments
    };
};

export default connect(mapStateToProps, { fetchRecentPunishments })(RecentPunishments);