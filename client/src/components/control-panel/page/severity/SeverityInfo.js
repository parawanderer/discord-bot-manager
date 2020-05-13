import React from 'react';
import { Link } from 'react-router-dom';


import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';

import Button from '../../generic/Button';


class SeverityInfo extends React.Component {


    getTypeIcon() {
        const {type_raw} = this.props.sev;
        return PunishmentSeverityHelper.getIcon(type_raw);
    }

    getSeverity() {
        const {severity} = this.props.sev;
        return PunishmentSeverityHelper.getSeverityBlock(severity);
    }

    getTypeText() {
        const {type_raw} = this.props.sev;
        return PunishmentSeverityHelper.getTextType(type_raw);
    }


    getDurationAndPercentage = () => {
        const {length, percentage} = this.props.sev;

        if (length === 0) {
            return (
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Duration
                    </span>
                    <span className="severity-info-data">
                        <span className="time-perm">
                            Permanent
                        </span>
                    </span>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Base Duration
                    </span>
                    <span className="severity-info-data">
                        {PunishmentSeverityHelper.timeToReadableString(length)}
                    </span>
                </div>
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Increase
                    </span>
                    <span className="severity-info-data">
                        {percentage}%
                    </span>
                </div>
            </React.Fragment>
        );
    };

    renderSevBlockTop = () => {
        return (
            <div className="severity-info-top">
                <div className="severity-icon">
                    {this.getTypeIcon()}
                </div>
                <div className="severity-desc">
                    {this.getSeverity()}
                    {this.getTypeText()}
                </div>
            </div>
        );

    };

    renderInfoBlock = () => {
        const {id, added_by} = this.props.sev;

        return (
            <div className="severties-info-body">
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        ID
                    </span>
                    <span className="severity-info-data">
                        <div className="severity-id">{id}</div>
                    </span>
                </div>
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Type
                    </span>
                    <span className="severity-info-data">
                        {this.getTypeText()}
                    </span>
                </div>
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Severity
                    </span>
                    <span className="severity-info-data">
                        {this.getSeverity()}
                    </span>
                </div>
                {this.getDurationAndPercentage()}
                <div className="severity-info-item">
                    <span className="severity-info-title">
                        Added By
                    </span>
                    <span className="severity-info-data">
                        <span className="severity-admin-id">{added_by}</span>
                        <Link to="/admins">
                            <div className="view-more">
                                Go to Admins
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </Link>
                    </span>
                </div>
            </div>
        );
    };

    
    render() {

        // id
        // type_raw
        // length
        // severity
        // percentage
        // added_b
        // props.onDeleteButtonpressCallback
        // props.onEditButtonpressCallback
        const { sev } = this.props;

        if (!sev) return null;

        const isSev1Mute = sev.type_raw === 1 && sev.severity === 1;

        return (
            <div className="severity-info">
                {this.renderSevBlockTop()}
                {this.renderInfoBlock()}
                <div className="severity-control-block">
                    <Button icon={<i className="fas fa-edit"></i>} text="Edit" onClick={this.props.onEditButtonpressCallback} classes="edit-type" />
                    <Button icon={<i className="fas fa-trash-alt"></i>} text="Remove" onClick={this.props.onDeleteButtonpressCallback} classes="delete-type" disabled={isSev1Mute} />
                </div>
            </div>
        );
    }
}

export default SeverityInfo;