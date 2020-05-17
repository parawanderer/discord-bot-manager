import React from 'react';
import ActiveState from '../../generic/ActiveState';
import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';
import Username from '../../generic/Username';

class PunishmentListItem extends React.Component { 



    renderPunishment() {

        const { punishment } = this.props;
        
        const type = PunishmentSeverityHelper.getPunishmentType(punishment.raw_type, true);
        const severity = PunishmentSeverityHelper.getPunishmentSeverity(punishment.severity, punishment.raw_type);

        return (
            <div className="punishment">
                {type}
                {severity}
            </div>
        );

    }

    renderPunishedUser() {
        const { punishment } = this.props;
        return <Username username={punishment.user_name} discriminator={punishment.user_discriminator}/>;
    }

    renderID() {
        const { punishment } = this.props;

        return PunishmentSeverityHelper.getIdLink(punishment);
    }

    renderStaff() {
        const { punishment } = this.props;

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
                </React.Fragment>
            );
        }

        return (
            <div className="punishment-issuer">
                {data}
            </div>
        );
    }

    /**
     * 
     * @param {string} timeString 
     */
    _getTimeSplitIndex(timeString) {
        // aim for 4th space, else 2nd, else nothing ...

        let lastIndex = -1;
        let numLoops = 0;

        while (numLoops < 4) {
            let nowIndex = timeString.indexOf(' ', lastIndex !== -1 ? lastIndex + 1 : 0);
            if (nowIndex !== -1) {
                lastIndex = nowIndex;
            } else {
                break;
            }
            numLoops++;
        }
        return lastIndex;
    }

    renderWhen() {
        const { punishment } = this.props;

        const seconds = Math.ceil((new Date().getTime() - punishment.timestamp)/1000);

        let time = PunishmentSeverityHelper.timeToReadableString(seconds);

        const split = this._getTimeSplitIndex(time);
        time = time.substring(0, split) + " ago";
    
        return time;
    }


    render() {
        // this.props.punishment
        const {active_state, visible} = this.props.punishment;

        return (
            <tr className={"punishment" + (!visible ? ' hidden' : '')} onMouseEnter={() => this.props.mouseEnterCallback(this.props.punishment)}>
                <td>
                <ActiveState active={active_state} short={true}/>
                </td>
                <td>
                    {this.renderID()}
                </td>
                <td>
                    {this.renderPunishment()}
                </td>
                <td>
                    {this.renderPunishedUser()}
                </td>
                <td>
                    {this.renderStaff()}
                </td>
                <td>
                    {this.renderWhen()}
                </td>
            </tr>
        );
    }
}

export default PunishmentListItem;