import React from 'react';
import ReportBlacklistItem from './ReportBlacklistItem';
import Button from '../../generic/Button';

class ReportBlacklist extends React.Component {

    onDeleteItemCallback = (userID) => {
        this.props.deleteCallback(userID);
    }

    onHoverItemCallback = (userID) => {
        this.props.hoverCallback(userID);
    }


    render() {

        //this.props.hoverCallback
        //this.props.deleteCallback
        //this.props.addButtonCallback

        const blacklistList = this.props.blacklist.map(item => 
            <ReportBlacklistItem 
                key={item} 
                userID={item} 
                onDeleteButtonpressCallback={this.onDeleteItemCallback} 
                mouseEnterCallback={this.onHoverItemCallback}
            />
            );        

        return (
            <div className="report-blacklist">
                <Button 
                    icon={<i className="fas fa-plus"></i>} 
                    text="Blacklist New User" 
                    onClick={this.props.addButtonCallback} 
                    classes="add-report-blacklist" 
                />
                <h3 className="block-title">Reports Blacklist
                    <span className="list-count">
                        {this.props.blacklist.length}
                    </span>
                </h3>
                <div className="report-blacklist-body">
                    {blacklistList}
                </div>
            </div>
        );
    }
}

export default ReportBlacklist;