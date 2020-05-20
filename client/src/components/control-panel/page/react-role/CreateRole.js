import React from 'react';

import EditPopup from '../../generic/EditPopup';
import StandardEmoji from '../../../../utils/StandardEmoji';
import TextInput from '../../generic/TextInput';

class CreateRole extends React.Component {

    state = {
        emojiError: null,
        inputError: null
    };

    selectedEmoji = StandardEmoji.getEmojis()[0];
    roleName = null;
    description = null;


    handleFormSubmission = () => {
        const result = this.validateFormData();

        if (result) {
            this.props.successfulSubmitCallback({
                emoji: this.selectedEmoji,
                emojiType: 1,
                emojiTypePretty: "DEFAULT",
                role: this.roleName,
                description : this.description || null
            });
        }
    };

    validateFormData = () => {

        const {emojisCurrentCategory} = this.props;

        if (!this.selectedEmoji) {
            this.setState({emojiError: 'You must provide a valid emoji!'});
            return false;
        }

        if (!this.roleName) {
            this.setState({inputError: 'You must provide a role name!'});
            return false;
        }

        if (emojisCurrentCategory.includes(this.selectedEmoji)) {
            this.setState({emojiError: 'You may not have a duplicate emoji in a category!'});
            return false;
        }
        return true;

    };

    handleValueChange = (e) => {
        this.selectedEmoji = e.target.value;
    }

    cancelHandler = () => {
        this.props.onCancel();
    };

    renderOptions = () => {
        const emojis = StandardEmoji.getEmojis();

        return emojis.map(emoji => {
            return (
                <option value={emoji} key={emoji}>
                        {emoji}
                    </option>
            );
        })
    }


    render() {

        const {show} = this.props;

        if (!show) return null;
        
        return (
            <EditPopup
                onCancel={this.cancelHandler}
                onConfirm={this.handleFormSubmission}
                title={"Create Role"}
                componentName={"create-role"}
                confirmText={"Create"}
            >

                Create a new role. All roles must have an emoji unique to the category and an associated role (role name).
                <br/>
                <select id="select-emoji" onChange={this.handleValueChange}>
                    {this.renderOptions()}
                </select>
                <div className="emoji-error">
                    {this.state.emojiError}
                </div>
                <TextInput
                    id="create-role-name"  
                    name="create-role-name" 
                    placeholder="Role Name" 
                    valueUpdateCallback={(newValue) => this.roleName = newValue }
                    error={this.state.inputError}
                />

                <TextInput
                    id="create-role-description"  
                    name="create-role-description" 
                    placeholder="Role Description" 
                    valueUpdateCallback={(newValue) => this.description = newValue }
                    textArea
                />
                
            </EditPopup>
        );
    }
}


export default CreateRole;