import React from 'react';

const ImmortalListItem = (props) => {


    const { userID, minecraftUUID, websiteID, mouseEnterCallback, onDeleteButtonpressCallback } = props;

    return (
        <div className="immortal-item" onMouseEnter={() => { mouseEnterCallback(userID) }}>
            <button className="immortal-delete" onClick={() => { onDeleteButtonpressCallback(userID) }}><i className="fas fa-unlink"></i></button>
            <div className="immortal-user">
                {userID}
            </div>
            <div className="immortal-user-mc">
                {minecraftUUID}
            </div>
            <div className="immortal-user-www">
                {websiteID}
            </div>
        </div>
    );
};

export default ImmortalListItem;