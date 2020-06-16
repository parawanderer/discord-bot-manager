import React from 'react';

import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';

import EditPopup from '../../generic/EditPopup';
import ToggleButton from '../../generic/ToggleButton';
import Button from '../../generic/Button';

class SeverityEdit extends React.Component {

    _lastId = null;
    isOpened = false;

    data = {
        id: null,
        added_by: null,
        type: {
            val: null, // 1/2
            error: null
        },
        severity: {
            val: null,// 1-1000
            error: null
        }, 
        // make sure to check for no duplicate type/severities before save

        permanent: {
            val: null,
            error: null
        }, 

        length: {
            final: null, // in seconds, final one
            error: null,
            editor: { // editor version
                secs: null,
                mins: null,
                hours: null,
                days: null
            }
        },
        percentage: {
            val: null,
            error: null
        } 
    };


    initData = () => {
        if (this.isOpened) return;
 
        const {id, type_raw, length, severity, percentage, added_by} = this.props.sev;

        this.data.type.val = type_raw;
        this.data.severity.val = severity;
        this.data.percentage.val = percentage;
        this.data.id = id;
        this.data.added_by = added_by;

        if (length === 0) {
            this.data.permanent.val = true;

            this.data.length.final = 0;
            this.data.length.editor.secs= '';
            this.data.length.editor.mins = '';
            this.data.length.editor.hours = '';
            this.data.length.editor.days = '';

            this.data.percentage.val = '';

        } else {
            this.data.permanent.val = false;
            this.data.length.final = length;
            // go through and split off all the values
            
            let tmp = length;

            let remainder = tmp % 60;
            tmp = Math.floor(tmp / 60);

            this.data.length.editor.secs = remainder;
            this.data.length.editor.mins = 0;
            this.data.length.editor.hours = 0;
            this.data.length.editor.days = 0;

            if (tmp > 0) {
                remainder = tmp % 60;
                tmp = Math.floor(tmp / 60);
                
                this.data.length.editor.mins = remainder;

                if (tmp > 0) { 
                    remainder = tmp % 24;
                    tmp = Math.floor(tmp / 24);
    
                    this.data.length.editor.hours = remainder;

                    if (tmp > 0) {
                        this.data.length.editor.days = tmp;
                    }
                }
            }

        }

        

    };

    getSeverity() {
        const {severity} = this.props.sev;
        return PunishmentSeverityHelper.getSeverityBlock(severity);
    }

    getTypeText() {
        const {type_raw} = this.props.sev;
        return PunishmentSeverityHelper.getTextType(type_raw);
    }

    getTypeInfo = () => {
        return (
            <span className="sev-info">
                {this.getSeverity()} {this.getTypeText()}
            </span>
        );
    };


    togglePermState = () => {
        this.handleUpdateValue('permanent', !this.data.permanent.val);
    };

    handleSelectType = (type) => {
        this.setState({ type });
    };


    handleUpdateValue = (valueKey, newData) => {
        this.data[valueKey].val = newData;
        this.forceUpdate();
    };

    handleUpdateTime = (valueKey, newData) => {
        this.data.length.editor[valueKey] = parseInt(newData);

        // get all the values from the fields and parse the single total second value

        let tmp = 0;

        tmp += parseInt(this.data.length.editor.secs === '' ? 0 : this.data.length.editor.secs);
        tmp += parseInt(this.data.length.editor.mins === '' ? 0 : this.data.length.editor.mins) * 60;
        tmp += parseInt(this.data.length.editor.hours === '' ? 0 : this.data.length.editor.hours) * 60 * 60;
        tmp += parseInt(this.data.length.editor.days === '' ? 0 : this.data.length.editor.days) * 60 * 60 * 24;

        this.data.length.final = tmp;

        this.forceUpdate();
    };



    getPassBackValues = () => {
        const returnVal = {
            id: null,
            added_by: null,
            type_raw: null,
            severity: null,
            length: null,
            percentage: null
        };

        returnVal.id = this.data.id;
        returnVal.added_by = this.data.added_by;
        returnVal.type_raw = this.data.type.val;

        if (this.data.permanent.val) {
            returnVal.length = 0;
            returnVal.percentage = 0;
        } else {
            returnVal.length = this.data.length.final;
            returnVal.percentage = this.data.percentage.val;
        }

        returnVal.severity = parseInt(this.data.severity.val);

        return returnVal;

    };

    onSave = () => {

        // validate data
        const validationResult = this.validateData();

        this.forceUpdate();

        if (validationResult) {
            if (this.props.onSave) this.props.onSave(this.getPassBackValues(), this.setNotIsOpened);
        }

    };

    setNotIsOpened = () => {
        this.isOpened = false;
        this.forceUpdate();
    }


    validateData = () => {
        let errors = 0;

        // reset errors
        this.data.type.error = null;
        this.data.severity.error = null;
        this.data.permanent.error = null;
        this.data.length.error = null;
        this.data.percentage.error = null;

        if (!(this.data.type.val >= 1 && this.data.type.val <= 2)) {
            // valid type
            this.data.type.error = 'Invalid Type!';
            errors++;
        }

        if (!(this.data.severity.val >= 1 && this.data.severity.val <= 1000)) {
            this.data.severity.error = 'Severity must be between 1 and 1000!';
            errors++;
        }

        if (this.checkIsDuplicate(this.data.id, this.data.severity.val, this.data.type.val)) {
            this.data.type.error = 'Severity + Type combo already exists!';
            this.data.severity.error = 'Severity + Type combo already exists!';
            errors++;
        }

        if (!this.data.permanent.val) {
            if (!(this.data.length.final >= 1)) {
                this.data.length.error = 'Punishment duration must be 1 second or longer!';
                errors++;
            }
            if (!(this.data.percentage.val >= 0)) {
                this.data.percentage.error = 'Percentage must be 0 percent or higher!';
                errors++;
            }
        }

        if (errors > 0) return false;
        return true;

    };

    checkIsDuplicate = (ownID, severity, rawType) => {
        if (!this.props.allSeverities) return null;

        for (let i =0;i<this.props.allSeverities.length; i++) {
            if (
                this.props.allSeverities[i].id !== ownID
                && this.props.allSeverities[i].type_raw === rawType 
                && this.props.allSeverities[i].severity === parseInt(severity)) {
                return true;
            }
        }
        return false;
    };


    renderEditor() {
        return (
            <div className="sev-editor">
                <div className="editor-block">

                    <div className="editor-title">Type</div>

                    <div className="editor-field">
                        <Button 
                            icon={<i className="fas fa-microphone-alt-slash"></i>} 
                            text="Mute" 
                            onClick={() => this.handleUpdateValue('type', 1)}
                            classes={`type-chooser${this.data.type.val === 1 ? ' selected' : ''}`}
                        />
                        <Button 
                            icon={<i className="fas fa-ban"></i>} 
                            text="Ban" 
                            onClick={() => this.handleUpdateValue('type', 2)}
                            classes={`type-chooser${this.data.type.val === 2 ? ' selected' : ''}`}
                        />
                    </div>
                    

                </div>
                <div className="editor-err">
                        {this.data.type.error}
                    </div>
                <div className="editor-block">

                    <div className="editor-title">Severity</div>

                    <div className="editor-field">
                        <input 
                            type="number" 
                            min="1" 
                            max="1000" 
                            value={this.data.severity.val || 1} 
                            onChange={e => this.handleUpdateValue('severity', e.target.value)}
                            className="severity-editor"
                            disabled={this.props.sev.severity === 1 && this.props.sev.type_raw === 1}
                        />
                    </div>
                    
                    
                </div>
                <div className="editor-err">
                        {this.data.severity.error}
                    </div>
                <div className="editor-block">

                    <div className="editor-title">Permanent</div>

                    <div className="editor-field">
                        <ToggleButton onClick={this.togglePermState} state={this.data.permanent.val} />
                    </div>
                    
                </div>
                <div className={`no-perm ${this.data.permanent.val ? 'true' : ''}`}>
                    <div className="editor-block editor-newline">

                        <div className="editor-title">Base Duration</div>

                        <div className="editor-field">
                            <input 
                                type="number"
                                min="0" max="100000" 
                                disabled={this.data.permanent.val} 
                                value={this.data.length.editor.days}
                                onChange={e => this.handleUpdateTime('days', e.target.value)} 
                            />
                            <span className="time-txt">days</span>
                            <input 
                                type="number" 
                                min="0" 
                                max="24" 
                                disabled={this.data.permanent.val} 
                                value={this.data.length.editor.hours}
                                onChange={e => this.handleUpdateTime('hours', e.target.value)} 
                            /> 
                            <span className="time-txt">hours</span>
                            <input 
                                type="number" 
                                min="0" 
                                max="60" 
                                disabled={this.data.permanent.val} 
                                value={this.data.length.editor.mins}
                                onChange={e => this.handleUpdateTime('mins', e.target.value)} 
                            />
                            <span className="time-txt">mins</span>
                            <input 
                                type="number" 
                                min="0" 
                                max="60" 
                                disabled={this.data.permanent.val} 
                                value={this.data.length.editor.secs}
                                onChange={e => this.handleUpdateTime('secs', e.target.value)} 
                            />
                            <span className="time-txt">secs</span>
                        </div>

                    
                    </div>
                    <div className="editor-err">{this.data.length.error}</div>

                    <div className="editor-block">

                        <div className="editor-title">Percentage Increase</div>

                        <div className="editor-field">
                            <input 
                                type="number" 
                                min="0" 
                                max="1000" 
                                disabled={this.data.permanent.val} 
                                value={this.data.percentage.val}
                                onChange={e => this.handleUpdateValue('percentage', e.target.value)} 
                                className="percent-editor"
                            />
                        </div>

                        
                    </div>
                    <div className="editor-err">
                            {this.data.percentage.error}
                        </div>
                    <span className="comment">
                        Percentage by which to increase for every subsequent punishment of the same type
                    </span>
                </div>
            </div>
        );
    }

    onCancelHandler = () => {
        this.isOpened = false;
        if (this.props.onCancel) this.props.onCancel();
    }; 


    render() {

        //this.props.onSave
        //this.props.onCancel

        if (!this.props.sev || !this.props.show) return null;

        this.initData();
        this.isOpened = true;

        return (
            <EditPopup
                onCancel={this.onCancelHandler}
                onConfirm={this.onSave}
                title={<div>Edit : {this.getTypeInfo()}</div>}
                componentName={"sev"}
                confirmText={"Save"}
                confirmIcon={<i className="fas fa-save"></i>}
            >
                {this.renderEditor()}
            </EditPopup>
        );
    }
}

export default SeverityEdit;