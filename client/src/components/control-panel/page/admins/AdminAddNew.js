import React from 'react';
import { connect } from 'react-redux';

import InputValidator from '../../../../utils/InputValidator';

import Button from '../../generic/Button';
import CloseButton from '../../generic/CloseButton';
import TextInput from '../../generic/TextInput';




class AdminAddNew extends React.Component {

    data = { newAdminID : ''};
    state = { adminIdError : null };

    handleValueUpdateCallback = (newValue) => {
        // handle retrieving the updated value from the TextInput object
        this.data.newAdminID = newValue;
    };

    getAdminsUserIDs() {
        const ids = [];
        for (let i = 0; i < this.props.admins.length; i++) {
            ids.push(this.props.admins[i].userId);
        }
        return ids;
    }


    handleFormSubmission = () => {
        const result = this.validateFormData();

        if (result) {
            this.props.successfulSubmitCallback(this.data);
        }
    };

    validateFormData = () => {
        const id = this.data.newAdminID.trim();

        if (id === '') {
            this.setState({adminIdError : 'Id may not be empty!'});
            return false;
        }

        if (!InputValidator.isDiscordID(id)) {
            // is valid discord id
            this.setState({adminIdError : 'Invalid Discord ID!'});
            return false;
        }

        if (this.getAdminsUserIDs().includes(id)) {
            // finally make sure the admin isn't already added
            this.setState({adminIdError : 'This user is already an Admin!'});
            return false;
        }

        return true;

    };

    cancelHandler = () => {
        this.data.newAdminID = '';
        this.setState({adminIdError : null});
        this.props.onCancel();
    };


    renderAddAdmin() {
        // this.props.successfulSubmitCallback

        return (
            <div className="add-admin popup" id="add_admin" >
                <CloseButton id="close_admin_add" onClick={this.cancelHandler} />
                <h3 className="block-title">Add Admin </h3>
                <div className="delete-admin-body">
                    Provide the ID of the user you'd like to add as an Admin

                    <TextInput 
                        id="new_admin_id"  
                        name="new_admin_id" 
                        placeholder="Admin ID" 
                        valueUpdateCallback={this.handleValueUpdateCallback}
                        error={this.state.adminIdError}
                    />

                </div>
                <div className="delete-admin-buttons">
                    <Button text="Cancel" classes="cancel" onClick={this.cancelHandler} />
                    <Button text="Add New Admin" icon={<i className="fas fa-user-plus"></i>} classes="add-admin" onClick={this.handleFormSubmission} />
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.show) return null;
        
        return this.renderAddAdmin();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        admins: state.admins
    }
};

export default connect(mapStateToProps , {})(AdminAddNew);