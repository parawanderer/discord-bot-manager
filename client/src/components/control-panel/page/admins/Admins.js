import React from 'react';
import { connect } from 'react-redux';

import { fetchAdminsDetailed, deleteAdmin, addNewAdmin, fetchMember } from '../../../../action';

import Loading from '../../generic/Loading';
import Button from '../../generic/Button';

import SelectedAdmin from './SelectedAdmin';
import AdminListItem from './AdminListItem';
import AdminDelete from './AdminDelete';
import AdminAddNew from './AdminAddNew';


class Admins extends React.Component {

    state = {
        selectedAdmin : null,
        selectedForDeletion: null,
        showDelete: false,
        showAdd: false
    };

    async componentDidMount() {
        await this.props.fetchAdminsDetailed();

        // foreach admin fetch admin details...
        // if (this.props.admins) {
        //     for (let i =0; i < this.props.admins.length; i++) {
        //         let admin = this.props.admins[i];
        //         this.props.fetchMember(admin.userId);
        //     }
        // }
    }

    mouseEnterAdmin = (admin) => {
        this.setState({selectedAdmin : admin})
    };

    mouseOutAdmin = () => {
        this.setState({selectedAdmin : null});
    };


    showDeleteSelectedAdmin = (adminToDelete) => {
        this.setState({selectedForDeletion : adminToDelete})
        this.setState({showDelete: true})
    };

    hideDeleteSelectedAdmin = () => {
        this.setState({selectedForDeletion : null})
        this.setState({showDelete: false})
    };


    confirmDeleteSelectedAdmin = () => {
        this.props.deleteAdmin(this.state.selectedForDeletion.userId);
        
        if (this.state.selectedAdmin && this.state.selectedAdmin.userId === this.state.selectedForDeletion.userId)
            this.setState({selectedAdmin : null})

        this.setState({selectedForDeletion : null})
        this.setState({showDelete: false})
    };


    successfulSubmitCallback = async (data) => {
        const newAdminID = data.newAdminID;
        const ownID = this.props.auth.user.adminUID;
        const ownName = this.props.auth.user.username;

        await this.props.addNewAdmin(newAdminID, ownID, ownName);
        this.props.fetchMember(newAdminID); // addNewAdmin does not return member details. We will make this call to get the member details
    };

    showAddNewAdmin = () => {
        this.setState({showAdd: true});
    };

    closeAddNewAdmin = () => {
        this.setState({showAdd: false});
    };


    renderAdminList() {
        return (
            <div className="admin-list">
                <Button icon={<i className="fas fa-plus"></i>} text="Add New Admin" onClick={this.showAddNewAdmin} classes="add-admin" />
                <h3 className="block-title">Bot Admins {this.renderAdminCount()}</h3>
                <div className="admin-list-content">
                    {this.props.admins.map(
                        admin => <AdminListItem 
                            key={admin.userId} 
                            admin={admin} 
                            self={this.props.auth.user} 
                            mouseEnterCallback={this.mouseEnterAdmin} 
                            onDeleteButtonpressCallback={() => this.showDeleteSelectedAdmin(admin)}
                            />
                        )}
                </div>
            </div>
        );
    }

    renderAdminCount() {
        return(
            <span className="list-count">
                {this.props.admins.length}
            </span>
        );
    }


    renderPage() {
        return (
            <div id="admins">
                <div className="left">
                {this.renderAdminList()}
                </div>
                <div className="right">
                    <SelectedAdmin 
                        selected={this.state.selectedAdmin}
                        onDeleteButtonpressCallback={() => this.showDeleteSelectedAdmin(this.state.selectedAdmin)}
                        />
                </div>

                <AdminAddNew 
                    show={this.state.showAdd} 
                    onCancel={this.closeAddNewAdmin}
                    successfulSubmitCallback={this.successfulSubmitCallback}
                />

                <AdminDelete 
                    admin={this.state.selectedForDeletion}
                    show={this.state.showDelete}
                    onCancel={this.hideDeleteSelectedAdmin}
                    onDeleteConfirm={this.confirmDeleteSelectedAdmin}
                />
            </div>
        );

    }

    renderLoading() {
        return (
            <div id="admins">
                <Loading/>
            </div>
        );
    }

    render() {
        if (!this.props.admins) {
            return this.renderLoading();
        }
        return this.renderPage();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        admins: state.admins,
        auth: state.auth
    };
}

export default connect(mapStateToProps, { fetchAdminsDetailed, deleteAdmin, addNewAdmin, fetchMember })(Admins);