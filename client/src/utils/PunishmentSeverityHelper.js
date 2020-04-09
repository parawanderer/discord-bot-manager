import React from 'react';

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
        name: 'century',
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

}


export default PunishmentSeverityHelper;