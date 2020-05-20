import React from 'react';

import EditPopup from '../../generic/EditPopup';
import StandardEmoji from '../../../../utils/StandardEmoji';
import TextInput from '../../generic/TextInput';

class CreateCategory extends React.Component {

    state = {
        nameError: null
    };

    categoryName = null;
    categoryDescription = null;
    categoryRole = null;

    handleFormSubmission = () => {
        const result = this.validateFormData();

        if (result) {
            this.props.successfulSubmitCallback({
                automaticRole: this.categoryRole || null,
                description: this.categoryDescription || null,
                name: this.categoryName,
                roles : {}
            });
        }
    };

    validateFormData = () => {

        const {allCategories} = this.props;

        if (!this.categoryName) {
            this.setState({nameError: 'Your category must have a name!'});
            return false;
        }

        if (allCategories.includes(this.categoryName)) {
            this.setState({nameError: 'Your category name must be unique!'});
            return false;
        }
        return true;

    };


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
                title={"Create Category"}
                componentName={"create-category"}
                confirmText={"Create"}
            >

                Create a new category. All categories must have an unique name. It's recommended to use a simple name.
                <br/>
                Note that the category name is case sensitive!
                <br/>
                <TextInput
                    id="create-category-name"  
                    name="create-category-name" 
                    placeholder="Category Name" 
                    valueUpdateCallback={(newValue) => this.categoryName = newValue }
                    error={this.state.nameError}
                />
                <TextInput
                    id="create-category-descr"  
                    name="create-category-descr" 
                    placeholder="Category Description" 
                    valueUpdateCallback={(newValue) => this.categoryDescription = newValue }
                    textArea
                />

                <TextInput
                    id="create-category-role"  
                    name="create-category-role" 
                    placeholder="Category Automatic Role" 
                    valueUpdateCallback={(newValue) => this.categoryRole = newValue }
                />
                
            </EditPopup>
        );
    }
}


export default CreateCategory;