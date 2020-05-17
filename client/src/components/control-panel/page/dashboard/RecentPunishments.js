import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import Loading from '../../generic/Loading';

import { fetchRecentPunishments } from '../../../../action/index';
import ActiveState from '../../generic/ActiveState';
import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';
import Username from '../../generic/Username';


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

    getUsername(punishment) {
        return (
            <Username username={punishment.user_name} discriminator={punishment.user_discriminator}/>
        );
    }

    getTimestamp(punishment) {

        return (
            <div className="punishment-time">
                <div className="punishment-time-prefix">WHEN</div>
                <div className="punishment-reason">
                {PunishmentSeverityHelper.getPunishmentTimestamp(punishment)}
                </div>
            </div>
        );
    }

    getID(punishment) {
        return PunishmentSeverityHelper.getIdLink(punishment);
    }


    renderIndividualPunishment(punishment) {
        
        const id = this.getID(punishment);

        const activeState = <ActiveState active={punishment.active_state}/>

        const time = this.getTimestamp(punishment);

        const type = PunishmentSeverityHelper.getPunishmentType(punishment.raw_type);

        const severity = PunishmentSeverityHelper.getPunishmentSeverity(punishment.severity, punishment.raw_type);

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