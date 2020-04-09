import React from 'react';

import DeletePopup from '../../generic/DeletePopup';

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
            <DeletePopup
                onCancel={this.props.onCancel}
                onConfirm={this.props.onDeleteConfirm}
                title={"Delete Admin"}
                componentName={"admin"}
                removeText={"Remove this Admin"}
            >
                Are you sure you want to delete this admin?
                {this.getAdminInfo()}
            </DeletePopup>
        );
    }
}

export default AdminDelete;