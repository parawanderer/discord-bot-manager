import React from 'react';

const ActiveState = (props) => {

    if (props.active) {
        return (
            <div className="active-state active">
                <i className="fas fa-check"></i>
                Active
            </div>
        );
    }

    return (
        <div className="active-state inactive">
            <i className="fas fa-slash"></i>
            Inactive
        </div>
    );
};

export default ActiveState;