import React from 'react';
import { connect } from 'react-redux';


import TextInput from '../../generic/TextInput';
import EditPopup from '../../generic/EditPopup';
import WordTypeSelection from './WordTypeSelection';


const TYPE_STRINGS = {
    0 : 'whitelist',
    1 : 'exact_word',
    2 : 'containing_string'
};


class EditWord extends React.Component {

    data = { 
        id: {
            val: null,
            error: null
        },
        raw_type: {
            val: null,
            error: null
        },
        data: {
            val: null,
            error: null
        }
    };

    hasInit = false;


    initData = () => {
        if (this.hasInit) return;

        const {id, raw_type, data} = this.props.word;

        this.data.id.val = id;
        this.data.raw_type.val = raw_type;
        this.data.data.val = data;

        this.hasInit = true;
    };

    resetData = () => {

        this.data.id.val = null;
        this.data.id.error = null;
        this.data.raw_type.error = null;
        this.data.raw_type.val= null;
        this.data.data.val = null;
        this.data.data.error = null;

        this.hasInit = false;
    };


    handleValueUpdateCallback = (newWord) => {
        // handle retrieving the updated value from the TextInput object
        this.data.data.val = newWord;
    };

    handleWordTypeUpdateCallback = (newTypeRaw) => {
        this.data.raw_type.val = newTypeRaw;

        this.forceUpdate(); // to update the selection classes
    };


    forceLowercase = (string) => {
        return string.toLowerCase();
    }


    handleFormSubmission = () => {
        const result = this.validateFormData();

        this.forceUpdate(); // to draw errors

        if (result) {
            this.props.successfulSubmitCallback(this.convertToCallbackObject());
            this.resetData();
        }
    };


    convertToCallbackObject = () => {
        const returnObject = {
            id : null,
            type: null,
            raw_type : null,
            data: null
        };

        returnObject.id = this.data.id.val;
        returnObject.raw_type = this.data.raw_type.val;
        returnObject.data = this.data.data.val;
        returnObject.type = TYPE_STRINGS[this.data.raw_type.val];

        return returnObject;
    };


    resetErrors = () => {
        this.data.raw_type.error = null;
        this.data.data.error = null;
    };

    validateFormData = () => {

        let errors = 0;
        const data = this.data.data.val;
        const raw_type = this.data.raw_type.val;

        // reset errors
        this.resetErrors();


        if (raw_type !== 0 && !raw_type) {
            this.data.raw_type.error = 'Type must be selected!';
            errors++;
        }
        else if (!(raw_type >= 0 && raw_type <= 2)) 
        {
            this.data.raw_type.error = 'Invalid type!';
            errors++;
        }

        if (!data) {
            this.data.data.error = 'Word must be provided!';
            errors++;
        } else {

            // Type specific matches
            if (raw_type === 1 && data.indexOf(" ") !== -1) {
                // "exact" matches may not contain spaces!!!
                this.data.data.error = 'Exact matches may not contain spaces!';
                errors++;
            }
            else if (data.trim() === '') {
                // no empty strings allowed in general
                this.data.data.error = 'May not be an empty string or solely contain spaces!';
                errors++;
            }
        }

        

        // duplicate check...
        if (!errors && this.checkDuplicates(data, raw_type, this.data.id.val)) {
            // there was a duplicate
            this.data.raw_type.error = 'This combination of type/word already exists!';
            this.data.data.error = 'This combination of type/word already exists!';
            errors++;
        }


        if (errors > 0) return false;
        return true;

    };

    checkDuplicates = (data, rawType, id) => {

        for(let i = 0; i < this.props.filter.words.length; i++) {
            const word = this.props.filter.words[i];
            if (word.raw_type === rawType && word.data === data && word.id !== id) return true;
        }

        return false;
    };

    cancelHandler = () => {
        this.resetData();
        this.props.onCancel();
    };

    render() {
        if (!this.props.show) return null;

        this.initData();
        
        // this.props.successfulSubmitCallback


        return (
            <EditPopup
                onCancel={this.cancelHandler}
                onConfirm={this.handleFormSubmission}
                title={`Edit Word: ${this.props.word.data}`}
                componentName={"word"}
                confirmText={"Save"}
                confirmIcon={<i className="fas fa-save"></i>}
            >
                <div className="word-editor">

                    <div className="editor-block">

                        <div className="editor-title">Type</div>
                    
                        <div className="editor-field">
                            <WordTypeSelection 
                                typeSelectionCallback={this.handleWordTypeUpdateCallback}
                                currentSelection={this.data.raw_type.val}
                            />
                        </div>
                        
                    </div>
                    <div className="editor-err">{this.data.raw_type.error}</div>


                    <div className="editor-block">

                        <div className="editor-title">Word</div>
                    
                        <div className="editor-field">
                            <TextInput 
                                id="new_word"  
                                name="new_word" 
                                placeholder="New Word" 
                                valueUpdateCallback={this.handleValueUpdateCallback}
                                valueUpdateMiddlewareCallback={this.forceLowercase}
                                value={this.data.data.val}
                            />
                        </div>
                    </div>
                    <div className="editor-err">{this.data.data.error}</div>

                </div>
                
            </EditPopup>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter
    }
};

export default connect(mapStateToProps , {})(EditWord);