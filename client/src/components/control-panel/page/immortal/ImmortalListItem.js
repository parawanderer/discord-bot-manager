import React from 'react';
import ActiveState from '../../generic/ActiveState';

const ImmortalListItem = (props) => {

    const { userID, websiteID, mouseEnterCallback, onDeleteButtonpressCallback, minecraftInfo, active } = props;

    const renderMinecraftInfo = () => {
        if (!minecraftInfo) {
            return (
                <div className="immortal-user-mc">
                    <div className="immortal-mc-head no-data"/>
                    <div className="immortal-mc-name no-data"/>
                </div>
            );
        }
        return (
            <div className="immortal-user-mc">
                <div className="immortal-mc-head">
                    {
                        minecraftInfo.hasSkin ?
                        <img src={minecraftInfo.skin} alt={`${minecraftInfo.name}'s minecraft skin`}/>
                        :
                        <img src={'/img/steve.png'} alt={`${minecraftInfo.name}'s minecraft skin`}/>
                    }
                    
                </div>
                <div className="immortal-mc-name">
                    {minecraftInfo.name}
                </div>
            </div>
        );
    };


    return (
        <tr className="immortal-item" onMouseEnter={() => { mouseEnterCallback(userID) }}>
            <td className="immortal-active-state">
                <ActiveState active={active} />
            </td>
            <td className="immortal-mc-info">
                {renderMinecraftInfo()}
            </td>
            <td className="immortal-discord-info">
                <div className="immortal-user">
                    {userID}
                </div>
            </td>
            <td className="immortal-www-info">
                <div className="immortal-user-www">
                    {websiteID}
                </div>
            </td>
            <td>
                <button 
                    className="immortal-delete" 
                    onClick={() => { onDeleteButtonpressCallback(userID) }}
                    disabled={!active}
                >
                    <i className="fas fa-unlink"></i>
                </button>
                <a href={`https://www.mineplex.com/admin.php?users/${websiteID}/edit`} target="_blank" rel="noopener noreferrer">
                    <button 
                        className="immortal-edit-web"
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                </a>
            </td>
        </tr>
    );
};

export default ImmortalListItem;