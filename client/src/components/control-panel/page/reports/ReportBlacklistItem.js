import React from 'react';

const ReportBlacklistItem = (props) => {

    const userID = props.userID;
    const mouseEnterCallback = props.mouseEnterCallback;
    const onDeleteButtonpressCallback = props.onDeleteButtonpressCallback;

    return (
        <div className="blacklist-item" onMouseEnter={() => { mouseEnterCallback(userID) }}>
            <button className="report-blacklist-delete" onClick={() => { onDeleteButtonpressCallback(userID) }}><i className="fas fa-trash-alt"></i></button>
            <div className="blacklist-user">
                {userID}
            </div>
        </div>
    );
};

export default ReportBlacklistItem;