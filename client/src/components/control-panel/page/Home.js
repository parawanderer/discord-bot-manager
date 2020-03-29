import React from 'react';
import { connect } from "react-redux";
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

import { fetchGuildInfo } from '../../../action';

import Loading from '../generic/Loading';
import DiscordServer from './dashboard/DiscordServer';
import DiscordServerInfo from './dashboard/DiscordServerInfo';
import RecentPunishments from './dashboard/RecentPunishments';


class Home extends React.Component {

    componentDidMount() {
        this.props.fetchGuildInfo();
    }

    renderInfo() {
        if (!this.props.guild) {
            return (
                <div id="home">
                    <Loading/>
                </div>
            );
        }

        return (
            <div id="home">
                <div className="section-left">

                    <DiscordServer guild={this.props.guild } />
                    <DiscordServerInfo guild={this.props.guild} />

                </div>
                <div className="section-right">
                    <RecentPunishments />
                </div>
            </div>
        );
    }

    render() {
        return (
            this.renderInfo()
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        guild : state.guild
    };
};

export default connect(mapStateToProps, { fetchGuildInfo })(Home);