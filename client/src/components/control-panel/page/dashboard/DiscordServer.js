import React from 'react';

const DiscordServer = (props) => {
    
    return (
        <div className="guild-main">
            <span className="guild-banner-overlay" style={{backgroundImage: (props.guild.banner) ? `url(${props.guild.banner}?size=1024)` : ''}}></span>
            <div className="guild-logo">
                <img src={props.guild.server_icon} alt="guild icon" />
            </div>
            <div className="guild-name">
                <span className="title">{props.guild.name}</span>
                <div className="guild-level">
                    Boost tier {props.guild.boost_tier}
                </div>
                <div className="guild-descr">
                {props.guild.description}
                </div>
            </div>
        </div>
    );
};


export default DiscordServer;