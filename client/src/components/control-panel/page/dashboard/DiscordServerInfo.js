import React from 'react';

const DiscordServerInfo = (props) => {
    
    const renderInviteLinks = () => {
        const invites = props.guild.invites.map((invite, index) => 
        { 
            return (
                <li key={invite}>
                    <a href={invite}>Invite #{index}</a>
                </li>
            ); 
        });
    return <ul>{invites}</ul>;
    };

    const renderBannerUrl = () => {
        if (props.guild.banner) {
            return (
                <a href={props.guild.banner} target="_blank">
                    Link
                </a>
            );
        }
        return null;
    };


    return (
        <div className="guild-info">
                        <h3 className="block-title">Guild Info</h3>
                        <div className="inner">
                            <div className="left-block">
                                <ul>
                                    <li>
                                        <div className="list-type">
                                            <i className="fas fa-hashtag"></i>
                                            ID :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.id}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Name :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.name}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Icon URL :
                                        </div>
                                        <div className="list-answer">
                                            <a href={props.guild.server_icon} target="_blank">
                                                Link
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Description :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.description}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Vanity URL :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.vanity_url}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Banner URL :
                                        </div>
                                        <div className="list-answer">
                                            {renderBannerUrl()}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-block">
                            <ul>
                                    <li>
                                        <div className="list-type">
                                            Total Members :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.members_total}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Online Members :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.members_online}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Boost Count :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.boost_count}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Boost Tier :
                                        </div>
                                        <div className="list-answer">
                                            {props.guild.boost_tier}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="list-type">
                                            Invite Links :
                                        </div>
                                        <div className="list-answer">
                                            {renderInviteLinks()}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
    );
};


export default DiscordServerInfo;