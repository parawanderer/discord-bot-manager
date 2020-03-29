import React from 'react';
import EditButton from './EditButton';
import Button from './Button';
import TextInput from './TextInput';

class ToggleableTextInput extends React.Component {


    constructor(props) {
        super(props);

        // props.value = current value
        // props.placeholder = placeholder

        this.state = { 
            isEditing : false,
            error: null
        };

        this.data = {
            editedValue : props.value || ''
        };
    }

    onClickEdit = () => {
        this.setState({isEditing : true});
    };

    onClickCancel = () => {
        this.setState({isEditing : false, error : null});
    };

    valueUpdate = (newValue) => {
        this.data.editedValue = newValue;
    };  

    componentDidUpdate() {

    }


    validateValueWithCallback = () => {
        if (!this.props.vallidationCallback || !this.props.valueUpdateCallback) return; // just to prevent exceptions

        const validationFailed = this.props.vallidationCallback(this.data.editedValue);
        if (!validationFailed) {
            // we will now callback to the parent element with the updated value and its ID on the object...
            
            this.setState({ isEditing : false });
            
            if (!this.props.propertyKey) return;
            this.props.valueUpdateCallback(/*property Key */ this.props.propertyKey, /*new property value */ this.data.editedValue);
        }
        else {
            // there was an error... let's update and show the error
            this.setState({error : validationFailed}); // the variable contains the error
        }
    };


    renderField() {


        // this.props.vallidationCallback
        // this.props.valueUpdateCallback
        // this.props.propertyKey

        if (this.state.isEditing) {
            return (
                <span className="editable-field-current">
                
                <TextInput 
                    value={this.props.value} 
                    valueUpdateCallback={this.valueUpdate} 
                    placeholder={this.props.placeholder} 
                    error={this.state.error}
                />
                <Button text="Save" onClick={this.validateValueWithCallback} /> 
                <Button text="Cancel" classes="cancel" onClick={this.onClickCancel}/>
            </span>
            );
        }
        return (
            <span className="editable-field-current">
                {this.props.value} <EditButton onClick={this.onClickEdit}/>
            </span>
        );
    }

    render() {
        return (
            <div className="editable-field">
                {this.renderField()}
            </div>
        );
    }
}

export default ToggleableTextInput;