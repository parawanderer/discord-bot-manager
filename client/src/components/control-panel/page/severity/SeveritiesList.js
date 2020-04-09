import React from 'react';
import { connect } from 'react-redux';


import Button from '../../generic/Button';
import Loading from '../../generic/Loading';
import SeverityListItem from './SeverityListItem';

class SeverityList extends React.Component {
    
    state = {
        selectedMutes: true
    };

    sorted = {
        bans : null,
        mutes: null
    };


    selectMutes = () => {
        this.setState({selectedMutes : true});
    };

    selectBans = () => {
        this.setState({selectedMutes : false});
    };


    selectHandler = (id) => {
        this.props.selectedCallback(id);
    };


    renderPunishments(className) {

        // this.props.id
        // this.props.type_raw
        // this.props.length
        // this.props.severity
        // this.props.percentage
        // this.props.added_by

        let list = className === 'mutes' ? this.sorted.mutes : this.sorted.bans;

        const punishments = list.map(p => {
            return (
                <SeverityListItem 
                    key={p.id}
                    id={p.id}
                    type_raw={p.type_raw}
                    length={p.length}
                    severity={p.severity}
                    percentage={p.percentage}
                    added_by={p.added_by}
                    onHover={() => this.selectHandler(p.id)}
                    onDelete={this.props.onDeleteCallback}
                    onEdit={this.props.onEditCallback}
                />
            );
        });

        return (
            <div className={className}>
                {punishments}
            </div>
        );
    }

    convertToSortedInternal() {

        this.sorted.mutes = [];
        this.sorted.bans = [];

        for (let i = 0; i < this.props.severities.length; i++) {
            const sev = this.props.severities[i];
            if (sev.type_raw === 1) {
                this.sorted.mutes.push(sev);
            }
            else if (sev.type_raw === 2) {
                this.sorted.bans.push(sev);
            }
        }
        this.sorted.mutes = this.sortBySeverity([], this.sorted.mutes);
        this.sorted.bans = this.sortBySeverity([], this.sorted.bans);
    }

    sortBySeverity = (outArr, inArr) => {

        for (let i =0; i<inArr.length; i++) {
            const itemI = inArr[i];

            if (outArr.length === 0) {
                outArr.push(itemI);
            } else {
                for (let j =0; j < outArr.length; j++) {
                    const itemJ = outArr[j];
                    if (j === outArr.length-1 && itemI.severity > itemJ.severity) {
                        // if it's larger than the largest element in the list, is should become the last element in the list
                        outArr.splice(j+1, 0, itemI);
                        break;
                    }
                    else if (itemI.severity <= itemJ.severity) {
                        // if it's smaller than or equal to an element, it should be positioned in its position
                        outArr.splice(j, 0, itemI);
                        break;
                    }
                }
            }
        }
        return outArr;
    };


    renderMainPage() {

        this.convertToSortedInternal();

        return (
            <div className="severity-outer">
            <div className="severity-choose">
                <div className={this.state.selectedMutes ? 'selected' : ''} style={{display:'inline-block'}}>
                <Button 
                    text="Mutes" 
                    icon={<i className="fas fa-microphone-alt-slash"></i>}
                    onClick={this.selectMutes}
                    classes={`type-choose`}
                />
                </div>
                <div className={!this.state.selectedMutes ? 'selected' : ''} style={{display:'inline-block'}}>
                <Button 
                    text="Bans" 
                    icon={<i className="fas fa-ban"></i>}
                    onClick={this.selectBans}  
                    classes={`type-choose`}
                />
                </div>
            </div>

            <div className="severities">
                <div className="severities-body">
                    {this.state.selectedMutes ? this.renderPunishments('mutes') : this.renderPunishments('bans')}
                </div>
                <div className="severities-bottom">
                    <Button 
                        text="New Punishment Type" 
                        icon={<i className="fas fa-plus"></i>}
                        onClick={this.props.createNewCallback}
                    />
                </div>
            </div>
            </div>
        );
    }


    render() {  

        //this.props.selectedCallback
        //this.props.onDeleteCallback
        //this.props.onEditCallback
        //this.props.createNewCallback

        if (!this.props.severities) {
            return <Loading/>;
        }

        return this.renderMainPage();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        severities: state.severities
    }
};

export default connect(mapStateToProps, {})(SeverityList);