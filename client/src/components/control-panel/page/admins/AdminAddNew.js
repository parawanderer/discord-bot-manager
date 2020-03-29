import React from 'react';

import Button from '../../generic/Button';
import CloseButton from '../../generic/CloseButton';

class AdminAddNew extends React.Component {

    renderAddAdmin() {
        return (
            <div className="add-admin popup" id="add_admin" >
                <CloseButton id="close_admin_add" onClick={this.props.onCancel} />
                <h3 className="block-title">Add Admin </h3>
                <div className="delete-admin-body">
                    Provide the ID of the admin you want to add
                    <input id="new_admin_id" name="new_admin_id" type="text" placeholder="Admin ID" />
                </div>
                <div className="delete-admin-buttons">
                    <Button text="Cancel" classes="cancel" onClick={this.props.onCancel} />
                    <Button text="Add New Admin" icon={<i className="fas fa-user-plus"></i>} classes="add-admin" onClick={this.props.onDeleteConfirm} />
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.show) return null;
        
        return this.renderAddAdmin();
    }
}


export default AdminAddNew;