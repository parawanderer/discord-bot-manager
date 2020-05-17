import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const TYPE_ICONS = {
    0 : <i className="fad fa-exclamation-circle"></i>,
    1: <i className="fad fa-microphone-alt-slash"></i>,
    2 : <i className="fad fa-ban"></i>,
    'default': <i className="fad fa-question"></i>
};

const TYPE_TEXT = {
    0: 'Warning',
    1: 'Mute',
    2: 'Ban'
};

const TIMES = {
    0: {
        name: 'sec',
        divisor: 60
    },
    1: {
        name: 'min',
        divisor: 60
    },
    2: {
        name: 'hour',
        divisor: 24
    },
    3: {
        name: 'day',
        divisor: 365
    },
    4: {
        name: 'year',
        divisor: 100
    }
};

class PunishmentSeverityHelper {

    static getIcon = (rawType) => {
        const icon = TYPE_ICONS[rawType];
        if (icon) return icon;
        return TYPE_ICONS['default'];
    };  

    static getSeverityBlock = (severity) => {
        return (
            <div className={`punishment-severity sev${severity}`}>
                SEV {severity}
            </div>
        );
    };

    static getTextType = (rawType) => {
        const type = TYPE_TEXT[rawType];
        if (type) return type;
        return null; 
    };  

    static timeToReadableString = (secondsTime) => {
        if (secondsTime === 0) return 'Permanent';

        let tmp = secondsTime;
        let remainder;
        let timeString = "";
        let i = 0;
        
        while (tmp > 0) {
            remainder = tmp % TIMES[i].divisor;
            tmp = Math.floor(tmp / TIMES[i].divisor);
            if (remainder > 0) timeString = `${remainder} ${TIMES[i].name}${remainder > 1? 's' : ''} ` + timeString;
            i++;
        }
        if (i < 5) {
            remainder = tmp % TIMES[i].divisor;
            if (remainder > 0) timeString = `${remainder} ${TIMES[i].name}${remainder > 1? 's' : ''} ` + timeString;
        }

        return timeString;
    };

    static getPunishmentType(rawType, fullName = false) {
        switch(rawType) {
            case 1:
                return (<div className="punishment-type">
                            <i className="fad fa-microphone-alt-slash"></i>
                            {fullName ? <span className="punish-type-name">Mute</span> : null}
                        </div>);

            case 2:
                return (<div className="punishment-type">
                        <i className="fad fa-ban"></i>
                        {fullName ? <span className="punish-type-name">Ban</span> : null}
                    </div>);
            default:
                return (
                    <div className="punishment-type">
                        <i className="fad fa-exclamation-circle"></i>
                        {fullName ? <span className="punish-type-name">Warning</span> : null}
                    </div>);
        }
    }

    static getPunishmentSeverity(severity, rawType) {
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

    static getPunishmentTimestamp(punishment) {
        if (typeof punishment === typeof {} && punishment.timestamp) {
            return dateFormat(new Date(punishment.timestamp), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
        } else {
            return dateFormat(new Date(punishment), 'dddd, mmmm dS, yyyy, h:MM:ss TT');
        }
    }

    static getIdLink(punishment) {
        return (
            <Link to={`/punishments/punishment/${punishment.id}`}>
                <div className="punishment-id">
                    #{punishment.id}
                </div>
            </Link>
        );
    }

}


export default PunishmentSeverityHelper;