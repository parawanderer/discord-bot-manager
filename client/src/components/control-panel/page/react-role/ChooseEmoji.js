import React from 'react';

import EditPopup from '../../generic/EditPopup';
import StandardEmoji from '../../../../utils/StandardEmoji';

class ChooseEmoji extends React.Component {

    state = {
        emojiError: null
    };

    selectedEmoji = StandardEmoji.getEmojis()[0];

    componentDidMount() {
        const {currentEmoji} = this.props;
        this.selectedEmoji = currentEmoji;
    }

    handleFormSubmission = () => {
        const result = this.validateFormData();

        if (result) {
            this.props.successfulSubmitCallback(this.selectedEmoji);
        }
    };

    validateFormData = () => {

        const {categoryKeys, currentEmoji} = this.props;

        if (!this.selectedEmoji) {
            this.setState({emojiError: 'You must select an emoji!'});
            return false;
        }

        if (this.selectedEmoji === currentEmoji) {
            this.setState({emojiError: null});
            return false;
        }

        if (categoryKeys.includes(this.selectedEmoji)) {
            this.setState({emojiError: 'The emoji must be unique to the category!'});
            return false;
        }
        return true;

    };


    handleValueChange = (e) => {
        this.selectedEmoji = e.target.value;
        this.forceUpdate();
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
        if (!this.props.show) return null;

        return (
            <EditPopup
                onCancel={this.cancelHandler}
                onConfirm={this.handleFormSubmission}
                title={"Edit Emoji"}
                componentName={"edit-emoji"}
                confirmText={"Select This Emoji"}
            >

                Choose a default emoji to use for this role from the list.<br/>
                If the role is currently set up with a custom emoji, it will be replaced with a default one.
                <br/><br/>
                If you'd like to use a custom emoji using the command to add a role in the discord will be required.
                <br/>
                <br/>

                <select id="select-emoji" onChange={this.handleValueChange} value={
                    StandardEmoji.getEmojis().includes(this.selectedEmoji) 
                    ? this.selectedEmoji 
                    : undefined}>
                    {this.renderOptions()}
                </select>
                <div className="emoji-error">
                    {this.state.emojiError}
                </div>
                
            </EditPopup>
        );
    }
}


export default ChooseEmoji;