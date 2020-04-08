import React from 'react';
import {connect} from 'react-redux';

import { fetchBaseConfig, fetchRules, updateRules } from '../../../../action';

import Loading from '../../generic/Loading';
import TextInput from '../../generic/TextInput';
import Button from '../../generic/Button';
import SuccessPopup from '../../generic/SuccessPopup';

class Rules extends React.Component {

    editorFields = [];
    // container
    hasAddedMoreFields = false;

    state = {showSuccess : false};


    componentDidMount() {
        const {config, rules} = this.props;

        if (!config || !config.main) this.props.fetchBaseConfig();

        this.props.fetchRules();
    }

    renderCurrentEmbeds() {

        if (this.editorFields.length === 0) {
            // NOTE TO SELF: this kind of structure is necessary because without having an unique 
            // identifier per element the elements will not get redrawn correctly when we delete 
            // something from this array

            this.props.rules.data.forEach(element => {

                const val = typeof element !== typeof '' ? JSON.stringify(element) : element;

                this.editorFields.push(
                    {
                        timestamp: new Date().getTime() - Math.floor((Math.random() * 10000)), // just to ensure some more randomness
                        data: val,
                        error: null
                    }
                );

            });
        }

        const data = this.editorFields;

        const embeds = data.map((embedDataContainer, index) => {
            const val = embedDataContainer.data;
            const {timestamp, error}= embedDataContainer;

            return (
                <div className="embed-block" key={timestamp}>
                    <h4>
                        Rule Embed #{index+1}
                        <button className="rule-embed-delete" onClick={() => { this.handleDeleteField(index) }}><i className="fas fa-trash-alt"></i></button>
                    </h4>
                    <TextInput
                        key={timestamp}
                        textArea
                        id={`rules_block_${index}`}
                        name={`rules_block_${index}`}
                        placeholder="Discord Embed Here..." 
                        //valueUpdateCallback={this.handleValueUpdateCallback}
                        //error={this.state.blacklistIdError}
                        value={val}
                        valueUpdateCallback={(newvalue) => this.valueUpdateCallback(newvalue, index)}
                        error={error}
                    />
                </div>
            );
        });

        return (
            <div className="currentRules">
                {embeds}
            </div>
        );

    }

    handleAddField = () => {
        this.editorFields.push({
            timestamp: new Date().getTime(),
            data: '',
            error: null
        });
        this.forceUpdate();
    };

    handleDeleteField = (index) => {
        this.editorFields.splice(index, 1)
        this.forceUpdate();
    };

    valueUpdateCallback = (newValue, index) => {
        // update our local variable with the new value
        this.editorFields[index].data = newValue;
    };


    handleCancel = () => {
        // just reset everything to the current way it is set up

        // clear up to empty array
        this.editorFields = [];

        // add current data
        this.props.rules.data.forEach(element => {
            const val = typeof element !== typeof '' ? JSON.stringify(element) : element;

            this.editorFields.push(
                {
                    timestamp: new Date().getTime() - Math.floor((Math.random() * 10000)), // just to ensure some more randomness
                    data: val,
                    error: null
                }
            );
        });

        this.forceUpdate(); // redraw
    };


    handleFormSubmission = async () => {
        const result = this.validateFormData();
        this.forceUpdate(); // force redraw to show errors!

        if (result) {
            // if this passed we will submit!
            // We need to now parse all the objects and put them into a neat little array to ship through the action

            await this.props.updateRules(this.generateAPIRequestData());
            
            this.showUpdateSuccess();
            // Nothing else needs to be done. The page will update when we get the response back automatically.
        }
    };


    validateFormData = () => {

        let numErrors = 0;

        for (let i = 0; i < this.editorFields.length; i++) {
            const current = this.editorFields[i];
            const {data} = current;

            // validate that it is not empty
            if (data === '') {
                current.error = 'Value may not be empty!';
                numErrors++;
                continue;
            }

            // validate that is parseable from json/string to js object
            let parsed;
            try {
                parsed = JSON.parse(data);
            } catch (e) {
                current.error = 'Value could not be parsed to JSON!';
                numErrors++;
                continue;
            }

            // validate that the parsed string is at least an object
            if (typeof parsed !== typeof {}) {
                current.error = 'Value is not a valid JavaScript Object!';
                numErrors++;
                continue;
            }
            current.error = null;

        }

        if (numErrors === 0) return true;
        return false;

    };


    generateAPIRequestData = () => {
        // This is simply to parse it back to the API's format

        const newData = {};
        newData.data = [];

        this.editorFields.forEach(obj => {
            newData.data.push(JSON.parse(obj.data));
        });

        return newData;

    };

    showUpdateSuccess = () => {
        this.setState({showSuccess : true});
    };

    hideUpdateSuccess = () => {
        this.setState({showSuccess : false});
    };  


    render() {
        const {config, rules} = this.props;

        if (!config || !config.main || !rules) {
            return <Loading/>;
        }

        return (
            <div id="rules">
                <div className="rules-container">
                    <h3 className="block-title">Rule Embed System</h3>
                    <div className="rules-explain">
                        This page allows you to configure the embeds that will be sent when the bot command 
                        <span className="command">{config.main.commandPrefix}postrules</span> is used. 
                        <br/><br/>This page does not provide any level of useful validation (besides rudimentary parsing validation)! 
                        <br/>Using something like 
                        <a href="https://leovoel.github.io/embed-visualizer/" target="_blank" rel="noopener noreferrer"> this </a>
                        is highly recommended!
                    </div>
                    <div className="rules-body">
                        
                        {this.renderCurrentEmbeds()}

                    </div>
                    <div className="rules-buttons">
                        <Button text="Add Embed" icon={<i className="fas fa-plus"></i>} onClick={this.handleAddField} />
                        <div style={{float:'right'}}>
                            <Button text="Cancel" classes="cancel" onClick={this.handleCancel} />
                            <Button text="Save" icon={<i className="fas fa-save"></i>} classes="rules-save" onClick={this.handleFormSubmission} />
                        </div>
                    </div>
                </div>
                <SuccessPopup 
                    text={`Your Rules Embeds have been updated! You may now post them using the command ${config.main.commandPrefix}postrules in discord!`}
                    show={this.state.showSuccess}
                    onDismiss={this.hideUpdateSuccess}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config,
        rules: state.rules
    }
};

export default connect(mapStateToProps, {fetchBaseConfig, fetchRules, updateRules})(Rules);