import React from 'react';
import { connect } from 'react-redux';

import Loading from '../../generic/Loading';

const StaticConfigurationInfo = (props) => {

    const getContent = () => {

        if (!props.config || !props.config.main.allowedGuilds) {
            return <Loading/>;
        }
        
        const allowedGuildList = [];

        props.config.main.allowedGuilds.forEach(guild => {
            allowedGuildList.push(
                <span key={guild}>
                    {guild}
                </span>
            );
        });

        return(
            <div>
                <div className="left-block">
                    <ul>
                        <li>
                            <div className="list-type">
                                <i className="fas fa-hashtag"></i>
                                Bot ID :
                            </div>
                            <div className="list-answer">
                                {props.config.main.botID}
                            </div>
                        </li>
                        <li>
                            <div className="list-type">
                                Default Prefix :
                            </div>
                            <div className="list-answer">
                                {props.config.main.hardCodedPrefix}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right-block"> 
                    <ul>
                        <li>
                            <div className="list-type">
                                Whitelisted Guilds :
                            </div>
                            <div className="list-answer">
                                {allowedGuildList}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );

    };


    return (
        <div className="config-container static-config">
            <h3 className="block-title">Static Info</h3>
            <div className="config-body">
                {getContent()}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    };
};

export default connect(mapStateToProps, {})(StaticConfigurationInfo);