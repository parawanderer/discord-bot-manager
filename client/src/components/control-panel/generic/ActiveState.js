import React from 'react';

const ActiveState = (props) => {

    //props.short

    if (props.active) {
        return (
            <div className={"active-state active" + (props.short ? ' short' : '')}>
                <i className="fas fa-check"></i>
                {props.short ? '' : 'Active'}
            </div>
        );
    }

    return (
        <div className={"active-state inactive" + (props.short ? ' short' : '')}>
            <i className="fas fa-slash"></i>
            {props.short ? '' : 'Inactive'}
        </div>
    );
};

export default ActiveState;