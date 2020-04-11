import React from 'react';

const PATH_ASSOCIATIONS = {
    "": "Dashboard",
    "admins" : "Admins",
    "config" : "Configuration",
    "filter" : "Filter",
    "immortal" : "Immortal",
    "punishments" : "Punishments",
    "severities" : "Punishment System",
    "reports" : "Reports System",
    "rules" : "Rules",
    "react-role" : "Reaction Role System",
};

const ICON_ASSOCIATIONS = {
    dashboard: <i className="fad fa-tachometer-slowest"></i>,
    admins: <i className="fad fa-users-crown"></i>,
    configuration: <i className="fad fa-sliders-v-square"></i>,
    immortal: <i className="fad fa-stars"></i>,
    punishments: <i className="fad fa-user-slash"></i>,
    "reports system": <i className="fad fa-flag-alt"></i>,
    rules: <i className="fad fa-file-alt"></i>,
    "punishment system": <i className="fad fa-gavel"></i>,
    "reaction role system": <i className="fad fa-sensor-alert"></i>,
    "filter" :  <i className="fad fa-language"></i>
};

class IconFinder {

    static paths = PATH_ASSOCIATIONS;
    static icons = ICON_ASSOCIATIONS;

    static getIcon = (name) => {
        const icon = ICON_ASSOCIATIONS[name.toLocaleLowerCase()];
        if (icon) return icon;
        return null;
    };

    static getName = (path) =>  {
        const name = PATH_ASSOCIATIONS[path];
        if (name) return name;
        return null;
    };
}

export default IconFinder;