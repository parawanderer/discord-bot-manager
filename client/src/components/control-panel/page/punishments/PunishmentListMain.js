import React from 'react';

import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';



import {fetchAllPunishments, searchPunishmentsByUserID, searchPunishmentsByUsername, 
    searchPunishmentsByUsernameDiscriminator, setPunishmentsPage, 
    setPunishmentsPerPage, fetchMember, unbanUserById, unpunishUserById, unmuteUserById } from '../../../../action';

import PunishmentSearch from './PunishmentSearch';
import Loading from '../../generic/Loading';
import PunishmentListItem from './PunishmentListItem';
import PunishmentPerPageSelector from './PunishmentPerPageSelector';
import Username from '../../generic/Username';
import InputValidator from '../../../../utils/InputValidator';
import Button from '../../generic/Button';
import UnmuteConfirm from './UnmuteConfirm';
import UnbanConfirm from './UnbanConfirm';
import UnpunishConfirm from './UnpunishConfirm';


const MEMBER_SEARCH_ID_STR = "member-search-id";
const MEMBER_SEARCH_MEMBER_STR = "member-search-member";
const MEMBER_SEARCH_BUTTONS="member-search-opt";


class PunishmentListMain extends React.Component { 


    state = {
        loadingNewPage: false,
        showEditPerPage: false,
        searchError: null,
        showUnmute: false,
        showUnban: false,
        showUnpunish: false
    };

    _canNavigate = true;
    _searchTerm = null;
    _flagSearchByUserId = false;


    componentDidMount() {
        const GET_USER_ID_HISTORY_REGEX = /^\?id=(.+)$/;

        const { per_page, page, data } = this.props.punishments;

        if (data) {
            // let's check if the most recent data display was an ID search?
            if (data.search_data && data.search_data.user_id) {
                this._flagSearchByUserId = true;
                this._searchTerm = data.search_data.user_id;
                this.forceUpdate();
            }
        }

        const {search} = this.props.location;
        if (search) {
            if (GET_USER_ID_HISTORY_REGEX.test(search)) {
                const id = GET_USER_ID_HISTORY_REGEX.exec(search)[1];

                if (InputValidator.isDiscordID(id)) {
                    // requested for specific id in path params...
                    this.handleSearch('user_id', id);
                } else {
                    this.props.fetchAllPunishments(page, per_page);
                    this.props.history.push('/punishments');
                }

            } else {
                this.props.fetchAllPunishments(page, per_page);
                this.props.history.push('/punishments');
            }
        } else {
            if ((!data) || (data && !(data.search_data.user_id || data.search_data.username))) {
                // only actually _refresh_ the general list. Do not refresh if we previously fetched a specific user's history
                this.props.fetchAllPunishments(page, per_page);
            }
        }
    }

    hasMember(id) {
        const {member_fetch_history} = this.props;
        return member_fetch_history.fetched_ids.includes(id);
    }

    getMember(id) {
        const {member_fetch_history} = this.props;
        return member_fetch_history.member_history[id];
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

    hasActiveMutes() {
        const { data } = this.props.punishments
        if (!data|| !data.punishments) return false;

        for (let i = 0; i < data.punishments.length; i++) {
            const punishment = data.punishments[i];
            if (punishment.active_state && punishment.visible 
                && punishment.raw_type === 1) return true;
        }
        return false;
    }

    hasActiveBans() {
        const { data } = this.props.punishments
        if (!data|| !data.punishments) return false;

        for (let i = 0; i < data.punishments.length; i++) {
            const punishment = data.punishments[i];
            if (punishment.active_state && punishment.visible 
                && punishment.raw_type === 2) return true;
        }
        return false;
    }

    handleShowPageEditor = () => {
        this.setState({showEditPerPage : true});
    }

    handleHidePageEditor = () => {
        this.setState({showEditPerPage : false});
    }

    handleShowUnmute = () => {
        this.setState({showUnmute : true});
    }

    handleHideUnmute = () => {
        this.setState({showUnmute : false});
    }

    handleShowUnban = () => {
        this.setState({showUnban : true});
    }

    handleHideUnban = () => {
        this.setState({showUnban : false});
    }

    handleShowUnpunish = () => {
        this.setState({showUnpunish : true});
    }

    handleHideUnpunish = () => {
        this.setState({showUnpunish : false});
    }

    handleUnmuteUser = async (reason) => {
        const id = this.props.punishments.data.search_data.user_id;
        const {adminUID} = this.props.auth.user;
        this._canNavigate = false;
        await this.props.unmuteUserById(id, reason, adminUID);
        this.handleHideUnmute();
        this._canNavigate = true;
    };

    handleUnbanUser = async (reason) => {
        const id = this.props.punishments.data.search_data.user_id;
        const {adminUID} = this.props.auth.user;
        this._canNavigate = false;
        await this.props.unbanUserById(id, reason, adminUID);
        this.handleHideUnban();
        this._canNavigate = true;
    };

    handleUnpunishUser = async (reason) => {
        const id = this.props.punishments.data.search_data.user_id;
        const {adminUID} = this.props.auth.user;
        this._canNavigate = false;
        await this.props.unpunishUserById(id, reason, adminUID);
        this.handleHideUnpunish();
        this._canNavigate = true;
    };

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

    handleReload = async (stayOnCurrentUserIfById = false) => {
        console.log("reload?")
        console.log(this._canNavigate)
        if (!this._canNavigate) return;// already in the process of navigating
        this.props.enableScroll();

        const { page, per_page } = this.props.punishments;
        //this._flagSearchByUserId = false;

        this._canNavigate = false;
        this.setState({loadingNewPage : true});

        if (this._flagSearchByUserId && stayOnCurrentUserIfById) {
            console.log("this?");
            this._canNavigate = true;
            await this.handleSearch('user_id', this._searchTerm);
            
        } else {
            this._flagSearchByUserId = false;
            if (this.props.location.search) {
                this.props.history.push('/punishments');
            }
            await this.props.fetchAllPunishments(page, per_page);
        }
        
        this.setState({loadingNewPage : false});
        this._canNavigate = true;
    }

    handleSearch = async (option, searchValue) => {
        console.log("handleSearch?")
        console.log(this._canNavigate)
        if (!this._canNavigate) return;// already in the process of navigating
        
        const { page, per_page } = this.props.punishments;
        const DISCORD_REGEX = /^(.+)#([0-9]{4})$/;

        console.log("SearchValue'", searchValue);

        if (!searchValue) {
            this.setState({searchError : "No search term provided!"});
            return; // nothing provided
        }

        if (searchValue.length < 3) {
            this.setState({searchError : "Search term too short!"});
            return; // too short
        }

        this._flagSearchByUserId = false;
        this._canNavigate = false;
        this.setState({loadingNewPage : true});

        if (option === 'username') {
            // username search. Pretty simple.
            this.props.disableScroll();

            if (this.props.location.search) {
                // if we were at ?id=whatever reset this to just /punishments
                this.props.history.push('/punishments');
            }

            this._searchTerm = searchValue;
            await this.props.searchPunishmentsByUsername(searchValue, 1, 100);

            const {matching_user_ids} = this.props.punishments.data;
            const requested = [];
            for (let i = 0; i < matching_user_ids.length; i++) {
                const userID = matching_user_ids[i];
                if (!this.hasMember(userID) && !requested.includes(userID)) {
                    requested.push(userID);
                    this.props.fetchMember(userID);
                }
            }

            this._canNavigate = true;
            this.setState({loadingNewPage : false, searchError : null});
        } 
        else if (option === 'with_discriminator')
        {   
            let searchError = null;

            if (this.props.location.search) {
                // if we were at ?id=whatever reset this to just /punishments
                this.props.history.push('/punishments');
            }

            if (DISCORD_REGEX.test(searchValue)) {
                this.props.disableScroll();

                this._searchTerm = searchValue;
                const data = DISCORD_REGEX.exec(searchValue);
                const name = data[1];
                const discriminator = data[2];
                await this.props.searchPunishmentsByUsernameDiscriminator(name, discriminator, 1, 100);

                const {matching_user_ids} = this.props.punishments.data;
                const requested = [];
                for (let i = 0; i < matching_user_ids.length; i++) {
                    const userID = matching_user_ids[i];
                    if (!this.hasMember(userID) && !requested.includes(userID)) {
                        requested.push(userID)
                        this.props.fetchMember(userID);
                    }
                }

            } else {
                searchError= "Invalid discord Name#1234 string!";
            }

            this._canNavigate = true;
            this.setState({loadingNewPage : false, searchError});
            
        }
        else if (option === 'user_id')
        {   
            let searchError = null;

            if (InputValidator.isDiscordID(searchValue)) {

                // set up the 'query' string /punishments?id=whatever
                this.props.history.push(`/punishments?id=${searchValue}`);

                this.props.enableScroll();
                this._searchTerm = searchValue;

                if (!this.hasMember(searchValue)) {
                    this.props.fetchMember(searchValue);
                }

                this._flagSearchByUserId = true;
                await this.props.searchPunishmentsByUserID(searchValue, 1, 100);

            } else {
                searchError= "Invalid discord ID provided!";
            }

            this._canNavigate = true;
            this.setState({loadingNewPage : false, searchError});
        }

    }

    getSearchedName(userID) {
        if (!this.hasMember(userID)) {
            return userID;
        }
        const member = this.getMember(userID);
        if (member === null) {
            return userID;
        }
        return member.username;
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
                <button onClick={() => this.handleReload(true)} disabled={this.state.loadingNewPage}>
                    <i className="fas fa-repeat-alt"></i>
                </button>
                <button onClick={this.handleNavigateLeft} disabled={this.state.loadingNewPage || this._flagSearchByUserId || this.isFirstPage()}>
                    <i className="far fa-chevron-left"></i>
                </button>
                <button onClick={this.handleNavigateRight}  disabled={this.state.loadingNewPage || this._flagSearchByUserId || this.isLastPage()}>
                    <i className="far fa-chevron-right"></i>
                </button>
            </div>
        );
    }

    renderPunishmentsList() {

        const { per_page, page, data } = this.props.punishments;
        let start;
        let end;
        let footer = null;
        let noPunishments = false;


        if (data.fetched) {
            if (data && !this.state.loadingNewPage) {
                if (data.search_data.user_id || data.search_data.username) {
                    start = 1;
                    end = data.fetched;
                } else {
                    start = ((page - 1) * per_page)+1;
                    end = start-1 + data.fetched;
                }
                
            } else {
                start = ((page - 1) * per_page)+1;
                end = page * per_page;
            }
            footer = (
                <div className="punishments-list-footer">
                    Now showing punishments {start} through {end} ({end - start + 1} total)
                </div>
            );    
        } else {
            noPunishments = true;
            footer = (
                <div className="punishments-list-footer">
                    No punishments found for {this.getSearchedName(this._searchTerm)}...
                </div>
            );    
        }

        return (
            <div className="punishments-fulllist" id="punishments-fulllist">
                {this.renderPunishmentListNav()}
                <h3 className="block-title">
                    {this._flagSearchByUserId ? `${this.getSearchedName(this._searchTerm)}'s Punishments`: 'Most Recent Punishments'}
                    <span className="list-count">
                        { !noPunishments ?
                            <React.Fragment>{start} - <span className={"punishments-end" + (this.state.loadingNewPage ? ' unsure' : '')}>{end}</span></React.Fragment>
                            : 0
                        }
                    </span>
                </h3>

                {this.renderPunishmentsListInner()}

                { noPunishments ? <div className="info">No punishments were found :(</div> : null}

                <div className="punishments-fulllist-bottom">
                    {this.renderPunishmentListNav()}
                    {footer}
                </div>
                
            </div>
        );
    }

    renderDetailBlock() {

        const { per_page, page } = this.props.punishments;
        
        let innerData = null;

        if (this._flagSearchByUserId) {

            const hasActiveMutes = this.hasActiveMutes();
            const hasActiveBans = this.hasActiveBans();


            innerData = (
                <React.Fragment>
                    <Button text="Unmute" classes="user-unpunish unmute" disabled={!hasActiveMutes} onClick={this.handleShowUnmute}/>
                    <Button text="Unban" classes="user-unpunish unban" disabled={!hasActiveBans} onClick={this.handleShowUnban}/>
                    <Button text="Unpunish" classes="user-unpunish unpunish" disabled={!(hasActiveMutes || hasActiveBans)} onClick={this.handleShowUnpunish}/>

                    <Button text="Return to All Punishments" onClick={() => this.handleReload(false)} classes="return-to-all"/>
                </React.Fragment>
            );
        } else {

            innerData = (
                <React.Fragment>
                    <div className="det-block">
                        Page: <span className="det-block-item">{page}</span>
                    </div>
                    <div className="det-block">
                        Per Page: <span className="det-block-item">{per_page}</span>
                    </div>
                    <button className="det-edit" onClick={this.handleShowPageEditor}>
                        <i className="far fa-edit"></i>
                    </button>
                </React.Fragment>
            );
        }


        return (
            <div className="punishment-display-det">
                {innerData}
            </div>
        );
    }

    renderRecentPunishments() {
        return (
            <React.Fragment>
                <div id="punishment-list-main">
                    <div className="punishments-title">
                        <PunishmentSearch
                            searchHandler={this.handleSearch}
                            error={this.state.searchError}
                        />
                        <h1>
                            {this._flagSearchByUserId ? 'User Punishments': 'Recent Punishments'}
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
                <UnmuteConfirm
                    show={this.state.showUnmute}
                    userID={this._searchTerm} 
                    onCancel={this.handleHideUnmute} 
                    handleSubmit={this.handleUnmuteUser}
                />
                <UnbanConfirm
                    show={this.state.showUnban}
                    userID={this._searchTerm} 
                    onCancel={this.handleHideUnban} 
                    handleSubmit={this.handleUnbanUser}
                />
                <UnpunishConfirm
                    show={this.state.showUnpunish}
                    userID={this._searchTerm} 
                    onCancel={this.handleHideUnpunish} 
                    handleSubmit={this.handleUnpunishUser}
                />
            </React.Fragment>
        );
    }

    renderMatchingMember(id) {

        let innerData = null;

        if (!this.hasMember(id)) {
            // still fetching member...
            innerData = (
                <React.Fragment key={id}>
                    <td className={MEMBER_SEARCH_ID_STR}>
                        <span className="punishment-userid">{id}</span>
                    </td>
                    <td className={MEMBER_SEARCH_MEMBER_STR}>
                        <Loading text=" "/>
                    </td>
                    <td className={MEMBER_SEARCH_BUTTONS}>
                        <Button text="Get History" onClick={() => this.handleSearch('user_id', id)}/>
                    </td>
                </React.Fragment>
            );
        } else {
            const member = this.getMember(id);
            if (member === null) {
                // member left the server
                innerData = (
                    <React.Fragment key={id}>
                        <td className={MEMBER_SEARCH_ID_STR}>
                            <span className="punishment-userid">{id}</span>
                        </td>
                        <td className={MEMBER_SEARCH_MEMBER_STR}>
                            <div className="info">
                                <i className="fad fa-info-square"></i>
                                This member is not in the server
                            </div>
                        </td>
                        <td className={MEMBER_SEARCH_BUTTONS}>
                            <Button text="Get History" onClick={() => this.handleSearch('user_id', id)}/>
                        </td>
                    </React.Fragment>
                );

            } else {
                // member in server 

                innerData = (
                    <React.Fragment key={id}>
                        <td className={MEMBER_SEARCH_ID_STR}>
                            <span className="punishment-userid">{id}</span>
                        </td>
                        <td className={MEMBER_SEARCH_MEMBER_STR}>
                            <img src={member.effective_avatar} className="inline-avatar"  alt="user avatar"/>
                            <Username username={member.username} discriminator={member.discriminator}/>
                        </td>
                        <td className={MEMBER_SEARCH_BUTTONS}>
                            <Button text="Get History" onClick={() => this.handleSearch('user_id', id)}/>
                        </td>
                    </React.Fragment>
                );
            }
        }

        return (
            <tr className="matching-member" key={id}>
                {innerData}
            </tr>
        );
    }

    renderMatchingMemberList() {

        const {matching_user_ids} = this.props.punishments.data;

        let list = null;
        let bottom = null;
        let uniqueList = [];

        if (matching_user_ids.length) {
            // this can contain duplicates
            matching_user_ids.forEach(item => {
                if (!uniqueList.includes(item)) uniqueList.push(item);
            });
            list = uniqueList.map(userId => this.renderMatchingMember(userId));
        } else {
            bottom = (
                <div className="no-matches">
                    No matches found! :(
                </div>
            );
        }

        return(
            <div className="matching-members" id="matching-members">
                <h3 className="block-title">
                    <div className="loading-info">
                        {this.state.loadingNewPage ? <Loading text=" "/> : null}
                    </div>
                    Members Matching "{this._searchTerm}"
                    <span className="list-count">
                        {uniqueList.length}
                    </span>
                </h3>
                <div className="matching-info">
                    These are members who at one point were punished while having a name matching "{this._searchTerm}".
                    They may have since changed their name.
                </div>
                <div className="matching-list">
                    <table>
                        <tbody>
                            <tr>
                                <th className={MEMBER_SEARCH_ID_STR}>
                                    ID
                                </th>
                                <th className={MEMBER_SEARCH_MEMBER_STR}>
                                    Member
                                </th>
                                <th className={MEMBER_SEARCH_BUTTONS}>

                                </th>
                            </tr>
                            {list}
                        </tbody>
                    </table>
                    {bottom}
                </div>
            </div>
        );
    }

    renderMatchingMembers() {

        return (
            <React.Fragment>
                <div id="punishment-list-main">
                    <div className="punishments-title">
                        <PunishmentSearch
                            searchHandler={this.handleSearch}
                            error={this.state.searchError}
                        />
                        <h1>
                            Punished Member Search
                        </h1>
                    </div>
                    <div className="member-results-desc">
                        <Button text="Return to All Punishments" onClick={() => this.handleReload(false)} classes="return-to-all-members"/>
                    </div>
                    {this.renderMatchingMemberList()}
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


    render() {
        if (!this.props.punishments.data) return <Loading/>;
       
        if (this.props.punishments.data.punishments) {
            return this.renderRecentPunishments();
        } else {
            return this.renderMatchingMembers();
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        punishments: state.punishments,
        page: state.punishments.page,
        per_page: state.punishments.per_page,
        member_fetch_history: state.member_fetch_history,
        auth: state.auth
    };
};

export default connect(mapStateToProps, {fetchAllPunishments, searchPunishmentsByUserID, 
    searchPunishmentsByUsername, searchPunishmentsByUsernameDiscriminator, 
    setPunishmentsPage, setPunishmentsPerPage, fetchMember, unbanUserById, 
    unpunishUserById, unmuteUserById})(withRouter(PunishmentListMain));