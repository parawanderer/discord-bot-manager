import React from 'react';
import { connect } from 'react-redux';

import { fetchMcApiStatus } from '../../../../action';
import Loading from '../../generic/Loading';

class SelectedImmortalUser extends React.Component { 

    componentDidMount() {
        this.props.fetchMcApiStatus();
    }

    getTitle(url) {
        switch(url) {
            case 'minecraft.net':
                return null;
            case 'session.minecraft.net':
                return 'Sessions';
            case 'account.mojang.com':
                return 'Accounts';
            case 'authserver.mojang.com':
                return 'Authentication';
            case 'sessionserver.mojang.com':
                return 'Session Server';
            case 'api.mojang.com':
                return 'Mojang Api';
            case 'textures.minecraft.net':
                return 'Textures';
            case 'mojang.com':
                return null;
            default:
                return null;
        }
    }

    convertStatusColor(string) {
        switch (string) {
            case "green":
                return 0;
            case "yellow":
                return 1;
            case "red":
                return 2;
            default:
                return -1;
        }
    }

    renderStatusBlock(url, status, mainName = null) {

        let colour = '';

        switch (status) {
            case 0:
                colour = '#7cd65e';
                break;
            case 1:
                colour = '#f7c845';
                break;
            case 2:
                colour = '#dc5050';
                break;
            default:
                colour = ''
        }

        return (
            <div className="mc-status-block" key={url} style={{backgroundColor: colour}}>
                <div className="mc-status-b-name">
                    {mainName}
                </div>
                <div className="mc-status-b-url">
                    {url}
                </div>
            </div>
        );
    }

    renderInner() {
        const {mc_status} = this.props;

        if (!mc_status) {
            return <Loading text={' '}/>;
        }

        const list = mc_status.map(item => {
            const key = Object.keys(item)[0];
            const statusColor = item[key];
            return this.renderStatusBlock(key, this.convertStatusColor(statusColor), this.getTitle(key));
        });

        return (
            <div className="mc-status-inner">
                {list}
            </div>
        );

    }
    
    render() {

        return (
            <div id="mc-info">
                <div className="mc-status-title">
                    Mojang Service Status
                </div>
                <div className="mc-status-body">
                    {this.renderInner()}
                </div>
                <div className="mc-status-bottom">
                    Session Server being down (red) or having issues (red/yellow) may lead to inaccurate minecraft data display.
                </div>
                <div className="mc-status-footer">
                    Official Mojang Status Twitter @ <a href='https://twitter.com/MojangStatus' target="_blank"  rel="noopener noreferrer">@MojangStatus</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        mc_status: state.mc_status
    };
}

export default connect(mapStateToProps, { fetchMcApiStatus })(SelectedImmortalUser);