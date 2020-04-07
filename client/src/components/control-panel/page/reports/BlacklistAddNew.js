import React from 'react';
import { connect } from 'react-redux';

import InputValidator from '../../../../utils/InputValidator';

import Button from '../../generic/Button';
import CloseButton from '../../generic/CloseButton';
import TextInput from '../../generic/TextInput';




class BlacklistaddNew extends React.Component {

    data = { newBlacklistId : ''};
    state = { blacklistIdError : null };

    handleValueUpdateCallback = (newValue) => {
        // handle retrieving the updated value from the TextInput object
        this.data.newBlacklistId = newValue;
    };


    handleFormSubmission = () => {
        const result = this.validateFormData();

        if (result) {
            this.props.successfulSubmitCallback(this.data);
        }
    };


    validateFormData = () => {

        const id = this.data.newBlacklistId.trim();
        const {reportBlacklist} = this.props.config.data.reportSystem;

        if (id === '') {
            this.setState({blacklistIdError : 'Id may not be empty!'});
            return false;
        }

        if (!InputValidator.isDiscordID(id)) {
            // is valid discord id
            this.setState({blacklistIdError : 'Invalid Discord ID!'});
            return false;
        }

        if (reportBlacklist.includes(id)) {
            // finally make sure the blacklist isn't already added
            this.setState({blacklistIdError : 'This user is already blacklisted!'});
            return false;
        }

        return true;

    };

    cancelHandler = () => {
        this.data.newBlacklistId = '';
        this.setState({blacklistIdError : null});
        this.props.onCancel();
    };


    renderAddBlacklist() {
        // this.props.successfulSubmitCallback

        return (
            <div className="add-blacklist popup" id="add_blacklist" >
                <CloseButton id="close_blacklist_add" onClick={this.cancelHandler} />
                <h3 className="block-title">Add Blacklisted User </h3>
                <div className="delete-admin-body">
                    Provide the ID of the user you'd like to add to the blacklist

                    <TextInput 
                        id="new_blacklist_id"  
                        name="new_blacklist_id" 
                        placeholder="User ID" 
                        valueUpdateCallback={this.handleValueUpdateCallback}
                        error={this.state.blacklistIdError}
                    />

                </div>
                <div className="add-blacklist-buttons">
                    <Button text="Cancel" classes="cancel" onClick={this.cancelHandler} />
                    <Button text="Add User To Blacklist" icon={<i className="fas fa-user-plus"></i>} classes="add-blacklist" onClick={this.handleFormSubmission} />
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.show) return null;
        
        return this.renderAddBlacklist();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    }
};

export default connect(mapStateToProps , {})(BlacklistaddNew);