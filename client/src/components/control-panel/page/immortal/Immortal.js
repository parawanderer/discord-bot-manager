import React from 'react';
import { connect } from "react-redux";

import { fetchImmortals } from '../../../../action';

import Loading from '../../generic/Loading';
import ImmortalList from './ImmortalList';
import SelectedImmortalUser from './SelectedImmortalUser';


class Immortal extends React.Component {

    componentDidMount() {
        this.props.fetchImmortals();
    }

    hoveredUserHandler = async (userID) => {

        // // sanity check?
        // if (!this.props.config.reportBlacklist[userID]) return;
        
        // // fetch member if we do not have details for the member yet...
        // if (!this.props.config.reportBlacklist[userID].member) {
        //     await this.props.fetchMember(userID);
        // }
        // // set current selected member in component state
        
        // this.setState({
        //     selectedMember: this.props.config.reportBlacklist[userID].member
        // });

    };

    unlinkImmortalHandler = async (userID) => {
        // This will not use a confirmation check.

        // // sanity check?
        // if (!this.props.config.reportBlacklist[userID]) return;

        // // we will need to copy the "data" config and update it, then send it off
        // const newData = {...this.props.config.data};
        // // loop through until we find the deleted ID
        // const reportBlacklist = newData.reportSystem.reportBlacklist;
        // for (let i = reportBlacklist.length -1; i >= 0; i--) {
        //     if (reportBlacklist[i] === userID) {
        //         reportBlacklist.splice(i, 1);
        //         break;
        //     }
        // }

        // // send back the entirey config object into our API handler
        // await this.props.updateDataConfig(newData);
        // // this will update when it is processed.

        // // let's quickly check if this user wasn't selected to be displayed in the sidebar? If they were, we will unselect them
        // if (this.state.selectedMember && this.state.selectedMember.id === userID) {
        //     // unselect the user
        //     this.setState({
        //         selectedMember: null
        //     });
        // }
    };


    renderPage() {
        const { immortal } = this.props;

        return (
            <div id="immortal">
                <div className="left">
                    <ImmortalList 
                        immortals={immortal} 
                        deleteCallback={this.unlinkImmortalHandler}
                        hoverCallback={this.hoveredUserHandler}
                    />
                </div>
                <div className="right">
                    {/* <SelectedReportBlacklistUser 
                        member={this.state.selectedMember}
                        deleteCallback={this.deleteBlacklistForUser}
                    /> */}
                    {/* <SelectedImmortalUser
                        member={this.state.selectedMember}
                        deleteCallback={this.deleteBlacklistForUser}
                    /> */}
                </div>
            </div>
        );
    }

    render() {

        if (!this.props.immortal) {
            return <Loading/>;
        }
        
        return this.renderPage();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        immortal: state.immortal
    };
}

export default connect(mapStateToProps, { fetchImmortals } )(Immortal);