import React from 'react';
import PunishmentListMain from './PunishmentListMain';
import PunishmentCurrentDetail from './PunishmentCurrentDetail';

class PunishmentList extends React.Component { 

    state = {
        currentPunishment : null,
        shouldScroll: true
    };

    handleHoverPunishment = (punishment) => {
        this.setState({currentPunishment : punishment});
    }

    disableScrollHandler = () => {
        this.setState({shouldScroll : false});
    }

    enableScrollHandler = () => {
        this.setState({shouldScroll : true});
    }

    render() {
        return (
            <React.Fragment>
                <div id="punishments-list">
                    <div className="left">
                        <PunishmentListMain hoverPunishmentCallback={this.handleHoverPunishment} disableScroll={this.disableScrollHandler} enableScroll={this.enableScrollHandler}/>
                    </div>
                    <div className="right">
                        <PunishmentCurrentDetail punishment={this.state.currentPunishment} shouldScroll={this.state.shouldScroll}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PunishmentList;