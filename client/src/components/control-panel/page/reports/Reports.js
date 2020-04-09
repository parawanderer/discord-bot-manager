import React from 'react';
import { connect } from 'react-redux';

import { fetchDataConfig, updateDataConfig, fetchMember } from '../../../../action';
import Loading from '../../generic/Loading';
import ReportBlacklist from './ReportBlacklist';
import SelectedReportBlacklistUser from './SelectedReportBlacklistUser';
import BlacklistAddNew from './BlacklistAddNew';

class Reports extends React.Component {


    state = {
        selectedMember: null,
        showAdd: false
    };

    componentDidMount() {
        this.props.fetchDataConfig();
    }


    deleteBlacklistForUser = async (userID) => {
        // This will not use a confirmation check.

        // sanity check?
        if (!this.props.config.reportBlacklist[userID]) return;

        // we will need to copy the "data" config and update it, then send it off
        const newData = {...this.props.config.data};
        // loop through until we find the deleted ID
        const reportBlacklist = newData.reportSystem.reportBlacklist;
        for (let i = reportBlacklist.length -1; i >= 0; i--) {
            if (reportBlacklist[i] === userID) {
                reportBlacklist.splice(i, 1);
                break;
            }
        }

        // send back the entirey config object into our API handler
        await this.props.updateDataConfig(newData);
        // this will update when it is processed.

        // let's quickly check if this user wasn't selected to be displayed in the sidebar? If they were, we will unselect them
        if (this.state.selectedMember && this.state.selectedMember.id === userID) {
            // unselect the user
            this.setState({
                selectedMember: null
            });
        }
    };

    successfulSubmitAddNewBlacklistCallback = async (data) => {
        const {newBlacklistId} = data;

        // sanity check?
        if (this.props.config.reportBlacklist[newBlacklistId]) return;

        // we will need to copy the "data" config and update it, then send it off
        const newData = {...this.props.config.data};
        newData.reportSystem.reportBlacklist.push(newBlacklistId);

        this.props.updateDataConfig(newData);
        // we do not need to await any sort of update in this case

        // close the window
        this.closeAddNewBlacklist();
    };


    hoveredUserHandler = async (userID) => {

        // sanity check?
        if (!this.props.config.reportBlacklist[userID]) return;
        
        // fetch member if we do not have details for the member yet...
        if (!this.props.config.reportBlacklist[userID].member) {
            await this.props.fetchMember(userID);
        }
        // set current selected member in component state
        
        this.setState({
            selectedMember: this.props.config.reportBlacklist[userID].member
        });

    };


    showAddNewBlacklist = () => {
        this.setState({showAdd: true});
    };

    closeAddNewBlacklist = () => {
        this.setState({showAdd: false});
    };


    renderPage() {
        const blacklist = this.props.config.data.reportSystem.reportBlacklist;
        
        return (
            <div id="reports">
                <div className="left">
                    <ReportBlacklist blacklist={blacklist} 
                        deleteCallback={this.deleteBlacklistForUser}
                        hoverCallback={this.hoveredUserHandler}
                        addButtonCallback={this.showAddNewBlacklist}
                    />
                </div>
                <div className="right">
                    <SelectedReportBlacklistUser 
                        member={this.state.selectedMember}
                        deleteCallback={this.deleteBlacklistForUser}
                    />
                </div>

                <BlacklistAddNew
                    show={this.state.showAdd} 
                    onCancel={this.closeAddNewBlacklist}
                    successfulSubmitCallback={this.successfulSubmitAddNewBlacklistCallback}
                />
            </div>
        );
    }

    render() {

        console.log(this.props)

        if (!this.props.config || !this.props.config.data) {
            return <Loading/>;
        }

        return this.renderPage();
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    };
};

export default connect(mapStateToProps, { fetchDataConfig, updateDataConfig, fetchMember })(Reports);