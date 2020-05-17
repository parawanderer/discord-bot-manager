import React from 'react';

import { connect } from 'react-redux';

import { updateWhitelistedLink, addWhitelistedLink, removeWhitelistedLink } from '../../../../action';

import Button from '../../generic/Button';

import DeleteLink from './DeleteLink';
import AddLink from './AddLink';
import EditLink from './EditLink';
import SuccessPopup from '../../generic/SuccessPopup';



class LinksList extends React.Component {

    lastId = null;

    state = {
        currentLink: null,

        showDelete: false,
        showEdit: false,
        showAdd: false,

        showSuccessEdit : false,
        showSuccessAdd : false,
        showSuccessDelete : false,
    };


    handleDelete = (link) => {
        this.setState({
            currentLink: link,
            showDelete: true
        });
        this.lastId = link.id;
    };

    closeDelete = () => {
        this.setState({
            currentLink: null,
            showDelete: false
        });
    };

    confirmDelete = async () => {
        // the current word is in state...
        if (!this.state.currentLink) return; // sanity check
        const id = this.state.currentLink.id;

        // close confirmation
        this.closeDelete();

        // delete
        await this.props.removeWhitelistedLink(id);

        // announce success
        this.showSuccessDelete();
    };



    handleEdit = (link) => {
        this.setState({
            currentLink: link,
            showEdit: true
        });
        this.lastId = link.id;
    };

    closeEdit = () => {
        this.setState({
            currentLink: null,
            showEdit: false
        });
    };

    successfulEditCallback = async (data) => {
        //close editor
        this.closeEdit();
    
        // edit
        await this.props.updateWhitelistedLink(data.id, data);

        // announce success
        this.showSuccessEdit();
    };

    handleNew = () => {
        this.setState({
            showCreate: true
        });
    };


    closeNew = () => {
        this.setState({
            showCreate: false
        });
    }


    successfulNewCallback = async (data) => {
        // hide editor
        this.closeNew();
        
        // add
        await this.props.addWhitelistedLink(data);
        
        // show success
        this.showSuccessAdd();
    };


    showSuccessAdd = () => {
        this.setState({showSuccessAdd : true});
    };

    hideSuccessAdd = () => {
        this.setState({showSuccessAdd : false});
    };

    showSuccessEdit = () => {
        this.setState({showSuccessEdit : true});
    };

    hideSuccessEdit = () => {
        this.setState({showSuccessEdit : false});
    };

    showSuccessDelete = () => {
        this.setState({showSuccessDelete : true});
    };

    hideSuccessDelete = () => {
        this.setState({showSuccessDelete : false});
    };



    renderRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.url}</td>
                <td>
                    <div className="table-options">
                        <button className="table-button table-edit" onClick={() => this.handleEdit(item)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="table-button table-delete" onClick={() => this.handleDelete(item)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    render() {
        // this.props.links
        // this.props.show?

        return (
            <React.Fragment>
                <div className="left" style={{display : this.props.show ? 'inline-block' : 'none'}}>
                    <div className={`filter-section filter-links-list${this.props.show ? ' shown' : ''}`}>
                        <Button icon={<i className="fas fa-plus"></i>} text="Add Whitelisted Link" onClick={this.handleNew} classes="add-link" />
                        <h3 className="block-title">
                            Links Whitelist
                            <span className="list-count">
                                {this.props.links.length}
                            </span>
                        </h3>
                        <table><tbody>
                            <tr>
                                <th>Id</th>
                                <th>Link</th>
                                <th>Options</th>
                            </tr>
                            {this.props.links.map(link => this.renderRow(link))}
                        </tbody></table>
                    </div>
                </div>
                <div className="right"  style={{display : this.props.show ? 'inline-block' : 'none'}}>
                    <div className={`infobar${this.props.show ? ' shown' : ''}`}>
                        <div className="explain">
                            <h3>Links Whitelist</h3>
                            The links whitelist is applied to every user that does not have the role <b>Admin</b> and is not a <b>Bot Admin</b>.
                            <br/><br/>
                            Every link (or everything that looks like a link in the format of <pre>www.website.com</pre>) is filtered by default. 
                            Exceptions can be added to this whitelist to allow them to be posted by regular users!
                            <br/>
                            <h3>Types of Whitelists</h3>
                            There are 3 levels of whitelisting that are possible (to allow for ease of use)
                            <br/>
                            <ul>
                                <li>
                                    <b>Whitelist Entire Domains (including subdomains):</b>
                                    <br/>
                                    This will whitelist the entire domain including any of its subdomains. 
                                    <br/><br/>
                                    E.g. By whitelisting <pre>website.com</pre> you automatically whitelist any link on <pre>website.com</pre> such
                                    as <pre>website.com/link</pre> and also subdomains such as <pre>sub.website.com</pre>.
                                </li>
                                <br/>
                                <li>
                                    <b>Whitelist Only One Subdomain:</b>
                                    <br/>
                                    This will whitelist only the subdomain. The root domain will not be whitelisted, nor will other subdomains.
                                    <br/><br/>
                                    E.g. By whitelisting <pre>sub.website.com</pre> any link on <pre>sub.website.com</pre> such
                                    as <pre>sub.website.com/link</pre> will be whitelisted. <pre>something-else.website.com</pre> and <pre>website.com</pre> will not be.
                                </li>
                                <br/>
                                <li>
                                    <b>Whitelist Link Only:</b>
                                    <br/>
                                    This will whitelist only the provided link on the provided domain. Any other link on the website will not be whitelisted. 
                                    <br/><br/>
                                    E.g. By whitelisting <pre>website.com/my-link</pre> only <pre>website.com/my-link</pre> will be whitelisted. <br/>
                                    <pre>website.com</pre> or something like <pre>website.com/another-link</pre> will not be whitelisted.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <DeleteLink
                    link={this.state.currentLink}
                    show={this.state.showDelete}
                    onCancel={this.closeDelete}
                    onDeleteConfirm={this.confirmDelete}
                />

                <AddLink
                    show={this.state.showCreate}
                    onCancel={this.closeNew}
                    successfulSubmitCallback={this.successfulNewCallback}
                />

                <EditLink
                    link={this.state.currentLink}
                    show={this.state.showEdit}
                    onCancel={this.closeEdit}
                    successfulSubmitCallback={this.successfulEditCallback}
                />


                <SuccessPopup 
                    key={'edit'}
                    text={`Link with the id ${this.lastId} has been edited successfully!`}
                    show={this.state.showSuccessEdit}
                    onDismiss={this.hideSuccessEdit}
                />

                <SuccessPopup 
                    key={'new'}
                    text={`New whitelisted link has been added successfully!`}
                    show={this.state.showSuccessAdd}
                    onDismiss={this.hideSuccessAdd}
                />

                <SuccessPopup 
                    key={'delete'}
                    text={`Link with the id ${this.lastId} has been deleted successfully!`}
                    show={this.state.showSuccessDelete}
                    onDismiss={this.hideSuccessDelete}
                />
                
            </React.Fragment>
        );
    }
}

export default connect(null, { updateWhitelistedLink, addWhitelistedLink, removeWhitelistedLink })(LinksList);