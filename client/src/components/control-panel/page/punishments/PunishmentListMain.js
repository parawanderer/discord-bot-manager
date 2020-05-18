import React from 'react';

import { connect} from 'react-redux';
import {fetchAllPunishments, searchPunishmentsByUserID, searchPunishmentsByUsername, 
    searchPunishmentsByUsernameDiscriminator, setPunishmentsPage, setPunishmentsPerPage } from '../../../../action';

import PunishmentSearch from './PunishmentSearch';
import Loading from '../../generic/Loading';
import PunishmentListItem from './PunishmentListItem';
import PunishmentPerPageSelector from './PunishmentPerPageSelector';



class PunishmentListMain extends React.Component { 


    state = {
        loadingNewPage: false,
        showEditPerPage: false
    };

    _canNavigate = true;

    componentDidMount() {
        const { per_page, page } = this.props.punishments;
        this.props.fetchAllPunishments(page, per_page);
    }

    isFirstPage() {
        const { page } = this.props.punishments;

        return (page === 1);
    }

    isLastPage() {
        if (!this.props.punishments.data) return false

        const { per_page } = this.props.punishments;
        const pageMax = per_page;
        const pageCurrent = this.props.punishments.data.fetched;

        return pageMax > pageCurrent;
    }

    handleShowPageEditor = () => {
        this.setState({showEditPerPage : true});
    }
    handleHidePageEditor = () => {
        this.setState({showEditPerPage : false});
    }

    handleUpdateNewPerPage = async (newValue) => {
        this.handleHidePageEditor();
        this.props.setPunishmentsPerPage(newValue);

        this._canNavigate = false;
        this.setState({loadingNewPage : true});
        await this.props.fetchAllPunishments(1, newValue);
        this.setState({loadingNewPage : false});
        this._canNavigate = true;
    }

    handleNavigateLeft = async () => {
        const { page, per_page } = this.props.punishments;
        if (this.isFirstPage()) return; // nothing to go left to
        if (!this._canNavigate) return;// already in the process of navigating
        
        this._canNavigate = false;
        const nextPage = page -1;

        this.setState({loadingNewPage : true});
        this.props.setPunishmentsPage(nextPage);
        await this.props.fetchAllPunishments(nextPage, per_page);
        this.setState({loadingNewPage : false});
        this._canNavigate = true;
    }

    handleNavigateRight = async () => {
        const { page, per_page } = this.props.punishments;
        if (!this._canNavigate) return;// already in the process of navigating
        if (this.isLastPage()) return;

        this._canNavigate = false;
        const nextPage = page +1;

        this.setState({loadingNewPage : true});
        this.props.setPunishmentsPage(nextPage);
        await this.props.fetchAllPunishments(nextPage, per_page);
        this.setState({loadingNewPage : false});
        this._canNavigate = true;
    }

    handleReload = async () => {
        if (!this._canNavigate) return;// already in the process of navigating

        const { page, per_page } = this.props.punishments;

        this._canNavigate = false;
        this.setState({loadingNewPage : true});
        await this.props.fetchAllPunishments(page, per_page);
        this.setState({loadingNewPage : false});
        this._canNavigate = true;
    }

    renderPunishmentsListInner() {

        if (!this.props.punishments || !this.props.punishments.data) {
            return <Loading text=" "/>;
        }

        const { punishments } = this.props.punishments.data;

        const list = punishments.map(item => <PunishmentListItem key={item.id} punishment={item} mouseEnterCallback={this.props.hoverPunishmentCallback} />);
        
        return (
            <div className="punishments-body">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Active
                            </th>
                            <th>
                                ID
                            </th>
                            <th>
                                Punishment
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                By
                            </th>
                            <th>
                                When
                            </th>
                        </tr>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }

    renderPunishmentListNav() {
        return (
            <div className="punishment-list-nav">
                <div className="punishments-nav-load">
                    {this.state.loadingNewPage ? <Loading text=" "/> : null}
                </div>
                <button onClick={this.handleReload} disabled={this.state.loadingNewPage}>
                    <i className="fas fa-repeat-alt"></i>
                </button>
                <button onClick={this.handleNavigateLeft} disabled={this.state.loadingNewPage || this.isFirstPage()}>
                    <i className="far fa-chevron-left"></i>
                </button>
                <button onClick={this.handleNavigateRight}  disabled={this.state.loadingNewPage || this.isLastPage()}>
                    <i className="far fa-chevron-right"></i>
                </button>
            </div>
        );
    }

    renderPunishmentsList() {

        const { per_page, page } = this.props.punishments;
        let start;
        let end;

        if (this.props.punishments.data && !this.state.loadingNewPage) {
            start = ((page - 1) * per_page)+1;
            end = start-1 + this.props.punishments.data.fetched;
        } else {
            start = ((page - 1) * per_page)+1;
            end = page * per_page;
        }

        const footer = (
            <div className="punishments-list-footer">
                Now showing punishments {start} through {end} ({end - start + 1} total)
            </div>
        );

        return (
            <div className="punishments-fulllist" id="punishments-fulllist">
                {this.renderPunishmentListNav()}
                <h3 className="block-title">
                    Most Recent Punishments
                    <span className="list-count">
                        {start} - <span className={"punishments-end" + (this.state.loadingNewPage ? ' unsure' : '')}>{end}</span>
                    </span>
                </h3>

                {this.renderPunishmentsListInner()}

                <div className="punishments-fulllist-bottom">
                    {this.renderPunishmentListNav()}
                    {footer}
                </div>
                
            </div>
        );
    }

    renderDetailBlock() {

    const { per_page, page } = this.props.punishments;

        return (
            <div className="punishment-display-det">
                <div className="det-block">
                    Page: <span className="det-block-item">{page}</span>
                </div>
                <div className="det-block">
                    Per Page: <span className="det-block-item">{per_page}</span>
                </div>
                <button className="det-edit" onClick={this.handleShowPageEditor}>
                    <i className="far fa-edit"></i>
                </button>
            </div>
        );
    }

    render() {

        return (
            <React.Fragment>
                <div id="punishment-list-main">
                    <div className="punishments-title">
                        <PunishmentSearch/>
                        <h1>
                            Recent Punishments
                        </h1>
                    </div>
                    {this.renderDetailBlock()}
                    {this.renderPunishmentsList()}
                </div>
                <PunishmentPerPageSelector
                    show={this.state.showEditPerPage}
                    onCancel={this.handleHidePageEditor}
                    successfulSubmitCallback={this.handleUpdateNewPerPage}
                    value={this.props.punishments.per_page}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        punishments: state.punishments,
        page: state.punishments.page,
        per_page: state.punishments.per_page
    };
};

export default connect(mapStateToProps, {fetchAllPunishments, searchPunishmentsByUserID, 
    searchPunishmentsByUsername, searchPunishmentsByUsernameDiscriminator, 
    setPunishmentsPage, setPunishmentsPerPage})(PunishmentListMain);