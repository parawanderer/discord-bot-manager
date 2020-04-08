import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import {fetchBaseConfig, updateBaseConfig} from '../../../../action'

import StaticConfigurationInfo from './StaticConfigurationInfo';
import Loading from '../../generic/Loading';
import ToggleButton from '../../generic/ToggleButton';
import ToggleableTextInput from '../../generic/ToggleableTextInput';
import InputValidator from '../../../../utils/InputValidator';


const ACCEPTED_PREFIXES = ['~','!','@','#','$','%','^','&','*','-','_','+','=','<','>','?'];
// TODO: add support for toggling active status with button. Currently not possible due to particularity with bot API server setup.


class Configuration extends React.Component {

    async componentDidMount() {
        await this.props.fetchBaseConfig();
        this.data = {...this.props.config.main};
    }

    componentDidUpdate() {
        if (this.props.config && !this.data) this.data = {...this.props.config.main};
    }

    valueUpdateCallback = async (properyKey, newData) => {
        // first we need to update this.data to reflect the new data
        this.data[properyKey] = newData;
        if (properyKey === 'commandPrefix') {
            this.data['commandPrefixLastChangeUserID'] = this.props.auth.user.adminUID;
            this.data['commandPrefixLastChangeTimestamp'] = new Date().toISOString();
        }

        await this.props.updateBaseConfig(this.data);
    };


    // returns error string or false on successful validation
    discordServerIDValidateValue = (data) => {
        const newData = data.trim();
        if (newData === '') return 'ID may not be empty!';
        if (!InputValidator.isDiscordID(newData)) return 'Invalid discord TextChannel ID!';
        return false;
    };

    commandPrefixValidateValue = (data) => {
        const newData = data.trim();
        if (newData === '') return 'Prefix may not be empty!';
        if (newData.length > 1) return 'Prefix must be 1 character!';
        if (!ACCEPTED_PREFIXES.includes(newData)) return `Prefix must be one of: ${ACCEPTED_PREFIXES.join(', ')}`;
        return false;
    };

    

    

    renderMainSettings() {
        if (!this.props.config || !this.props.config.main) {
            return <Loading/>;
        }

        return (
            <div id="config">
                <StaticConfigurationInfo />
                <div className="config-container">
                    <h3 className="block-title">Basic Configuration Settings</h3>
                    <div className="config-body">
                        <ul>
                            <li>
                                <div className="list-type">
                                    Active :
                                </div>
                                <div className="list-answer">
                                    <ToggleButton 
                                        state={this.props.config.main.activateStatus} 
                                        propertyKey="activateStatus"
                                        valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Current Command Prefix :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.commandPrefix} 
                                        placeholder="Command Prefix"
                                        propertyKey="commandPrefix"
                                        vallidationCallback={this.commandPrefixValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                        </ul>
                        <div className="comment">
                            Command Prefix set by <div className="admin-id">{this.props.config.main.commandPrefixLastChangeUserID}</div>
                            on {dateFormat(new Date(this.props.config.main.commandPrefixLastChangeTimestamp), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                        </div>

                        <h4 className="sub-heading">
                            Action Logging Channels
                        </h4>

                        <ul>
                            <li>
                                <div className="list-type">
                                    General :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelActionLoggingGeneral} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelActionLoggingGeneral"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Messages :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelActionLoggingMessages} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelActionLoggingMessages"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Punishments :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelActionLoggingPunishments} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelActionLoggingPunishments"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                        </ul>

                        <h4 className="sub-heading">
                            Verification Channels
                        </h4>

                        <ul>
                            <li>
                                <div className="list-type">
                                    Confirmation :
                                </div>
                                <div className="list-answer">
                                <ToggleableTextInput 
                                    value={this.props.config.main.channelVerificationConfirmation} 
                                    placeholder="Text Channel ID"
                                    propertyKey="channelVerificationConfirmation"
                                    vallidationCallback={this.discordServerIDValidateValue}
                                    valueUpdateCallback={this.valueUpdateCallback}
                                />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Welcome :
                                </div>
                                <div className="list-answer">
                                <ToggleableTextInput 
                                    value={this.props.config.main.channelVerificationWelcome} 
                                    placeholder="Text Channel ID"
                                    propertyKey="channelVerificationWelcome"
                                    vallidationCallback={this.discordServerIDValidateValue}
                                    valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Verification Logs :
                                </div>
                                <div className="list-answer">
                                <ToggleableTextInput 
                                    value={this.props.config.main.channelVerificationLogs} 
                                    placeholder="Text Channel ID"
                                    propertyKey="channelVerificationLogs"
                                    vallidationCallback={this.discordServerIDValidateValue}
                                    valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                        </ul>

                        <h4 className="sub-heading">
                            Announcements
                        </h4>

                        <ul>
                            <li>
                                <div className="list-type">
                                    Public Punishment Alerts :
                                </div>
                                <div className="list-answer">
                                <ToggleableTextInput 
                                    value={this.props.config.main.channelAnnouncePunishmentsPublic} 
                                    placeholder="Text Channel ID"
                                    propertyKey="channelAnnouncePunishmentsPublic"
                                    vallidationCallback={this.discordServerIDValidateValue}
                                    valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Event Announcements :
                                </div>
                                <div className="list-answer">
                                <ToggleableTextInput 
                                    value={this.props.config.main.channelEventAnnouncements} 
                                    placeholder="Text Channel ID"
                                    propertyKey="channelEventAnnouncements"
                                    vallidationCallback={this.discordServerIDValidateValue}
                                    valueUpdateCallback={this.valueUpdateCallback}
                                    />
                                </div>
                            </li>
                        </ul>


                        <h4 className="sub-heading">
                            Staff Related
                        </h4>

                        <ul>
                            <li>
                                <div className="list-type">
                                    Staff Punishment Channel :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelPunishmentStaffChannel} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelPunishmentStaffChannel"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Staff Report Channel :
                                </div>
                                <div className="list-answer"> 
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelStaffReportingChannel} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelStaffReportingChannel"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Discord Moderation Channel :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelDiscordModeration} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelDiscordModeration"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                        </ul>


                        <h4 className="sub-heading">
                            Player Channels
                        </h4>


                        <ul>
                            <li>
                                <div className="list-type">
                                    Public Reporting Channel :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelPublicReportingChannel} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelPublicReportingChannel"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                            <li>
                                <div className="list-type">
                                    Casual Channel :
                                </div>
                                <div className="list-answer">
                                    <ToggleableTextInput 
                                        value={this.props.config.main.channelCasualPlayerChannel} 
                                        placeholder="Text Channel ID"
                                        propertyKey="channelCasualPlayerChannel"
                                        vallidationCallback={this.discordServerIDValidateValue}
                                        valueUpdateCallback={this.valueUpdateCallback}
                                        />
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
    

    render() {
        return this.renderMainSettings();
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { fetchBaseConfig, updateBaseConfig })(Configuration);