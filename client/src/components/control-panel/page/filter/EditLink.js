import React from 'react';
import { connect } from 'react-redux';


import TextInput from '../../generic/TextInput';
import EditPopup from '../../generic/EditPopup';


const DOMAIN_REGEX = /^(?:https?:\/\/)?((?:[a-zA-Z0-9-]{1,63}\.)?[a-zA-Z0-9-]{3,63}\.[a-zA-Z0-9-]{2,}(?:(?:\/.+)|\/)?)$/;

class EditLink extends React.Component {

    data = { 
        id: {
            val: null,
            error: null
        },
        url: {
            val: null,
            error: null
        }
    };

    hasInit = false;


    initData = () => {
        if (this.hasInit) return;

        const {id, url} = this.props.link;

        this.data.url.val = url;
        this.data.id.val = id;

        this.hasInit = true;
    };

    resetData = () => {

        this.data.id.val = null;
        this.data.id.error = null;
        this.data.url.error = null;
        this.data.url.val= null;

        this.hasInit = false;
    };


    handleValueUpdateCallback = (newWord) => {
        // handle retrieving the updated value from the TextInput object
        this.data.url.val = newWord;
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
            url: null
        };

        returnObject.id = this.data.id.val;
        returnObject.url = DOMAIN_REGEX.exec(this.data.url.val)[1];

        return returnObject;
    };


    resetErrors = () => {
        this.data.id.error = null;
        this.data.url.error = null;
    };

    validateFormData = () => {

        let errors = 0;

        // reset errors
        this.resetErrors();

        const url = this.data.url.val.trim();

        // check errors
        
        if (!url) {
            this.data.url.error = 'You must provide an URL!';
            errors++;
        } 
        else if (!DOMAIN_REGEX.test(url)) {
            this.data.url.error = 'Invalid URL provided!';
            errors++;
        }
        else if (this.checkDuplicates(DOMAIN_REGEX.exec(url)[1])) {
            this.data.url.error = "This URL is already in the system!";
            errors++;
        }

        if (errors > 0) return false;
        return true;

    };

    checkDuplicates = (newUrl, ownId) => {

        for(let i = 0; i < this.props.filter.links.length; i++) {
            const link = this.props.filter.links[i];
            if (link.url === newUrl && link.id !== ownId) return true;
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
                title={`Edit Link #${this.props.link.id}`}
                componentName={"link"}
                confirmText={"Save"}
                confirmIcon={<i className="fas fa-save"></i>}
            >
                <div className="link-editor">

                    <div className="editor-block">

                        <div className="editor-title">Link</div>
                    
                        <div className="editor-field">
                            <TextInput 
                                id="new_link"  
                                name="new_link" 
                                placeholder="New Link" 
                                valueUpdateCallback={this.handleValueUpdateCallback}
                                valueUpdateMiddlewareCallback={this.forceLowercase}
                                value={this.data.url.val}
                            />
                        </div>
                    </div>
                    <div className="editor-err">{this.data.url.error}</div>

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

export default connect(mapStateToProps , {})(EditLink);