import React from 'react';
import { connect } from "react-redux";

import { fetchImmortals, fetchMinecraftPlayer, fetchMember, deactivateImmortal } from '../../../../action';

import Loading from '../../generic/Loading';
import ImmortalList from './ImmortalList';
import SelectedImmortalUser from './SelectedImmortalUser';
import InputValidator from '../../../../utils/InputValidator';
import ImmortalUnlink from './ImmortalUnlink';
import MinecraftStatus from './MinecraftStatus';


class Immortal extends React.Component {

    _allowIndividualFetches = false;

    state = {
        selectedImmortal: null,
        selectedForDeletion: null,
        showDelete : false
    };

    componentDidMount = async () => {

        this._allowIndividualFetches = false;
        await this.props.fetchImmortals();
        this._allowIndividualFetches= true;
        
    };

    getUserIfExists = (discordId) => {
        const { immortal } = this.props;

        for (let i = 0; i < immortal.length; i++) {
            if (immortal[i].discord_id === discordId) return immortal[i];
        }
        return null;
    }

    hoveredUserHandler = async (userID) => {

        // don't update while showing deletion popup
        if (this.state.showDelete) return;

        // sanity check?
        const user = this.getUserIfExists(userID);
        if (!user) return;
        
        // fetch member if we do not have details for the member yet...
        if (!user.member) {
            await this.props.fetchMember(user.discord_id);
        }

        // fetch minecraft data if we do not have details for the minecraft user yet...
        if (!user.minecraft_info && this._allowIndividualFetches) {
            if (InputValidator.isValidUUID(user.minecraft_uuid)) {
                await this.props.fetchMinecraftPlayer(InputValidator.stripDashesFromUUID(user.minecraft_uuid));
            } else {
                console.warn(`User ${user.discord_id} had invalid minecraft UUID association. See object:`, user);
            }
        }
        // set current selected member in component state
        
        this.setState({
            selectedImmortal: user
        });

    };

    unlinkImmortalHandler = (discordUserId) => {

        const user = this.getUserIfExists(discordUserId);
        if (!user) return;

        this.setState({
            showDelete: true,
            selectedForDeletion: user
        });
    };

    handleDeleteConfirm = async () => {
        const immortalToUnlink = this.state.selectedForDeletion;

        await this.props.deactivateImmortal(immortalToUnlink.discord_id);

        this.hideUnlinkUser();

    };

    hideUnlinkUser = () => {
        this.setState({
            selectedForDeletion: null,
            showDelete : false
        });
    };


    renderPage() {
        const { immortal } = this.props;

        return (
            <React.Fragment>
                <div id="immortal">
                    <MinecraftStatus/>

                    <div className="left">
                        <ImmortalList 
                            immortals={immortal} 
                            deleteCallback={this.unlinkImmortalHandler}
                            hoverCallback={this.hoveredUserHandler}
                        />
                    </div>
                    <div className="right">
                        <SelectedImmortalUser
                            immortal={this.state.selectedImmortal}
                            deleteCallback={this.unlinkImmortalHandler}
                        />
                    </div>
                </div>
                <ImmortalUnlink
                    immortal={this.state.selectedForDeletion}
                    show={this.state.showDelete}
                    onCancel={this.hideUnlinkUser}
                    onDeleteConfirm={this.confirmDeleteSelectedAdmin}
                />

            </React.Fragment>
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

export default connect(mapStateToProps, { fetchImmortals, fetchMinecraftPlayer, fetchMember, deactivateImmortal } )(Immortal);