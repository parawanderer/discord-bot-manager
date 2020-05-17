import React from 'react';
import PunishmentListMain from './PunishmentListMain';
import PunishmentCurrentDetail from './PunishmentCurrentDetail';

class PunishmentList extends React.Component { 

    state = {
        currentPunishment : null
    };

    handleHoverPunishment = (punishment) => {
        this.setState({currentPunishment : punishment});
    }

    render() {
        return (
            <React.Fragment>
                <div id="punishments-list">
                    <div className="left">
                        <PunishmentListMain hoverPunishmentCallback={this.handleHoverPunishment}/>
                    </div>
                    <div className="right">
                        <PunishmentCurrentDetail punishment={this.state.currentPunishment}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default PunishmentList;