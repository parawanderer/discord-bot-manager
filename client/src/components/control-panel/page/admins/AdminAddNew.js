import React from 'react';
import { connect } from 'react-redux';

import InputValidator from '../../../../utils/InputValidator';

import TextInput from '../../generic/TextInput';
import EditPopup from '../../generic/EditPopup';




class AdminAddNew extends React.Component {

    data = { newAdminID : ''};
    state = { adminIdError : null};

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
            <EditPopup
                onCancel={this.cancelHandler}
                onConfirm={this.handleFormSubmission}
                title={"Add Admin"}
                componentName={"admin"}
                confirmText={"Add New Admin"}
                confirmIcon={<i className="fas fa-user-plus"></i>}
            >

                Provide the ID of the user you'd like to add as an Admin

                <TextInput 
                    id="new_admin_id"  
                    name="new_admin_id" 
                    placeholder="Admin ID" 
                    valueUpdateCallback={this.handleValueUpdateCallback}
                    error={this.state.adminIdError}
                />
                
            </EditPopup>
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