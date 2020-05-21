import React from 'react';

const ActiveState = (props) => {

    //props.short

    if (props.active) {
        return (
            <div className={"active-state active" + (props.short ? ' short' : '')}>
                <i className="fas fa-check"></i>
                <span className="active-state-text">{props.short ? '' : 'Active'}</span>
            </div>
        );
    }

    return (
        <div className={"active-state inactive" + (props.short ? ' short' : '')}>
            <i className="fas fa-slash"></i>
            <span className="active-state-text">{props.short ? '' : 'Inactive'}</span>
        </div>
    );
};

export default ActiveState;