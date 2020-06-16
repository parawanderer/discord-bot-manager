import React from 'react';
import { connect } from 'react-redux';

import { fetchSeverities, deleteSeverity, updateSeverity, addNewSeverity } from '../../../../action';


import Loading from '../../generic/Loading';
import SuccessPopup from '../../generic/SuccessPopup';

import SeverityList from './SeveritiesList';
import SeverityInfo from './SeverityInfo';
import SeverityDelete from './SeverityDelete';
import SeverityEdit from './SeverityEdit';
import SeverityAdd from './SeverityAdd';

class PunishmentSystem extends React.Component {


    state = {
        currentSev: null,
        showDelete: false,
        showEdit: false,
        showAdd: false,
        showUpdateSuccess: false,
        showAddSuccess: false
    };

    componentDidMount() {
        this.props.fetchSeverities();
    }

    severitySelectHandler = (id) => {
        // sanity check to make sure we're not currently showing a menu
        if (this.state.showDelete || this.state.showEdit || this.state.showUpdateSuccess ) return;

        // find mute by its id
        let sev = null;
        for (let i =0;i<this.props.severities.length; i++) {
            if (this.props.severities[i].id === id) {
                sev = this.props.severities[i];
                break;
            }
        }

        if (sev === null) return;

        // make sure to set the "currentSev" in state
        this.setState({currentSev : sev});
    };

    getSeverityByID = (id) => {
        let sev = null;

        for (let i =0;i<this.props.severities.length; i++) {
            if (this.props.severities[i].id === id) {
                sev = this.props.severities[i];
                break;
            }
        }

        return sev;
    };



    severityDeleteShowHandler = () => {
        // technically implied this.state.currentSev
        this.setState({showDelete : true});

    };
    severityDeleteHideHandler = () => {
        // technically implied this.state.currentSev
        this.setState({showDelete : false});

    };

    severityDeleteHandler = async () => {

        await this.props.deleteSeverity(this.state.currentSev.id);

        this.setState({currentSev : null});// unset deleted data
        this.severityDeleteHideHandler(); // close confirmation
    };



    severityEditShowHandler = () => {
        // technically implied this.state.currentSev
        this.setState({showEdit : true});
    };

    severityEditHideHandler = () => {
        // technically implied this.state.currentSev
        this.setState({showEdit : false});
    };

    severityEditHandler = async (newData, onEndFunction) => {

        await this.props.updateSeverity(newData.id, newData);

        this.setState({currentSev : this.getSeverityByID(this.state.currentSev.id)}); // set new data
        this.severityEditHideHandler(); // close editor
        onEndFunction();
        this.showUpdateSuccess(); // show success popup
    };


    showUpdateSuccess = () => {
        this.setState({showUpdateSuccess : true});
    };

    hideUpdateSuccess = () => {
        this.setState({showUpdateSuccess : false});
    };


    severityAddShowHandler = () => {
        this.setState({showAdd : true});
    };

    severityAddHideHandler = () => {
        this.setState({showAdd : false});
    };


    severityAddNewHandler = async (newData) => {
        // let's set the current user now...

        newData.added_by = this.props.auth.user.adminUID;

        await this.props.addNewSeverity(newData);

        this.severityAddHideHandler(); // close editor
        this.showAddSuccess(); // show success
        
    };


    showAddSuccess = () => {
        this.setState({showAddSuccess : true});
    };

    hideAddSuccess = () => {
        this.setState({showAddSuccess : false});
    };

    
    render() {

        if (!this.props.severities) {
            return <Loading/>;
        }


        return (
            <div id="severities">
                <div className="left">
                    <SeverityList 
                        selectedCallback={this.severitySelectHandler}
                        onDeleteCallback={this.severityDeleteShowHandler}
                        onEditCallback={this.severityEditShowHandler}
                        createNewCallback={this.severityAddShowHandler}
                    />
                </div>
                <div className="right">
                    <SeverityInfo 
                        sev={this.state.currentSev}
                        onDeleteButtonpressCallback={this.severityDeleteShowHandler}
                        onEditButtonpressCallback={this.severityEditShowHandler}
                    />
                </div>
                <SeverityDelete
                    sev={this.state.currentSev}
                    show={this.state.showDelete}
                    onDeleteConfirm={this.severityDeleteHandler}
                    onCancel={this.severityDeleteHideHandler}
                />
                <SeverityEdit
                    allSeverities={this.props.severities}
                    sev={this.state.currentSev}
                    show={this.state.showEdit}
                    onSave={this.severityEditHandler}
                    onCancel={this.severityEditHideHandler}
                />
                <SeverityAdd
                    allSeverities={this.props.severities}
                    show={this.state.showAdd}
                    onSave={this.severityAddNewHandler}
                    onCancel={this.severityAddHideHandler}
                />

                <SuccessPopup 
                    key={'edit'}
                    text={`Punishment Type #${this.state.currentSev ? this.state.currentSev.id : '?'} has been updated!`}
                    show={this.state.showUpdateSuccess}
                    onDismiss={this.hideUpdateSuccess}
                />
                <SuccessPopup 
                    key={'add'}
                    text={`New Punishment Type has been added!`}
                    show={this.state.showAddSuccess}
                    onDismiss={this.hideAddSuccess}
                />

            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        severities: state.severities,
        auth: state.auth
    }
};


export default connect(mapStateToProps, { fetchSeverities, deleteSeverity, updateSeverity, addNewSeverity} )(PunishmentSystem);