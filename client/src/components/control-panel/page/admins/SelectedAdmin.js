import React from 'react';
import dateFormat from 'dateformat';


class SelectedAdmin extends React.Component {


    renderAdminName() {
        return (
            <div className="selected-admin-username">
                <div className="selected-admin-username-text">
                    <span className="selected-admin-name">{this.props.selected.member.username}</span>
                    <span className="selected-admin-discr-t">
                        #
                    </span>
                    <span className="selected-admin-discr">
                        {this.props.selected.member.discriminator}
                    </span>
                    {!this.props.selected.member.nickname ? '' : 
                        <div className="selected-admin-nick">({this.props.selected.member.nickname})</div>
                    }
                </div>
                <div className="selected-admin-id">
                    {this.props.selected.userId}
                </div>
                <div className="selected-admin-type">
                    {this.props.selected.superAdmin? <span><i className="fad fa-crown"></i> Super Admin</span> : <span>Admin</span>}
                </div>
            </div>
        );
    }


    renderRegularAdmin() {
        return (
            <div className="selected-admin">
                <div className="selected-admin-base">
                    <div className="selected-admin-avatar">
                        <img src={this.props.selected.member.effective_avatar} alt="selected admin" />
                    </div>
                    {this.renderAdminName()}
                </div>
                <div className="admin-regular-block">
                    <div className="admin-added-by">
                        <span className="admin-added-title">ADDED BY</span>
                        <span className="admin-added-text">
                            {this.props.selected.addedByName}
                            <span className="admin-added-id">
                                {this.props.selected.addedBy}
                            </span>
                        </span>
                    </div>
                    <div className="admin-added-at">
                        <span className="admin-added-title">AT</span>
                        <span className="admin-added-text">
                            {dateFormat(new Date(this.props.selected.addedTimestamp), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
                        </span>
                    </div>
                    <button className="button delete-admin" onClick={this.props.onDeleteButtonpressCallback}>
                        <i className="fas fa-trash-alt"></i>
                        Remove Admin
                    </button>
                </div>
            </div>
        );
    }

    renderSuperAdmin() {
        return (
            <div className="selected-admin">
                <div className="selected-admin-base">
                    <div className="selected-admin-avatar">
                        <img src={this.props.selected.member.effective_avatar} alt="selected admin" />
                    </div>
                    {this.renderAdminName()}
                </div>
            </div>
        );
    }

    renderAdmin() {
        if (!this.props.selected || !this.props.selected.member) return null;
        
        if (this.props.selected.superAdmin) {
            return this.renderSuperAdmin();
        }
        return this.renderRegularAdmin();
    }

    render() {
        return this.renderAdmin();
    }
}

export default SelectedAdmin;
