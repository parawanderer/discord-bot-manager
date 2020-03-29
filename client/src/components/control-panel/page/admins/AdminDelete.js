import React from 'react';

import Button from '../../generic/Button';
import CloseButton from '../../generic/CloseButton';

class AdminDelete extends React.Component {


    getAdminInfo = () => {

        if (this.props.admin.member) {
            return (
                <div className="delete-admin-info">
                    <span className="delete-admin-name">{this.props.admin.member.username}</span>
                    <span className="delete-admin-discriminator">#{this.props.admin.member.discriminator}</span>
                    {!this.props.admin.member.nickname ? '' : 
                        <span className="delete-admin-nick">
                            ({this.props.admin.member.nickname})
                        </span>
                    }
                </div>
            );
        }
        return (
            <div className="delete-admin-info">
                <span className="delete-admin-id">{this.props.admin.userId}</span>
            </div>
        );
    };

    render() {
        if (!this.props.admin || !this.props.show || this.props.admin.superAdmin) return null;

        return (
            <div className="delete-admin popup" id="delete_admin" >
                <CloseButton id="close_admin_delete" onClick={this.props.onCancel} />
                <h3 className="block-title">Delete Admin </h3>
                <div className="delete-admin-body">
                    Are you sure you want to delete this admin?
                    {this.getAdminInfo()}
                </div>
                <div className="delete-admin-buttons">
                    <Button text="Cancel" classes="cancel" onClick={this.props.onCancel} />
                    <Button text="Remove this Admin" icon={<i className="fas fa-trash-alt"></i>} classes="delete-admin" onClick={this.props.onDeleteConfirm} />
                </div>
            </div>
        );
    }
}

export default AdminDelete;