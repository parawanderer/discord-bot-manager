import React from 'react';
import EditPopup from '../../generic/EditPopup';
import TextInput from '../../generic/TextInput';

class UnpunishConfirm extends React.Component {

    state = {
        error: null
    };

    _unmuteReason = null;

    handleValueUpdate = (newValue) => {
        this._unmuteReason = newValue;
    }

    handleAllowSubmit = () => {
        if (!this._unmuteReason || this._unmuteReason.trim().length === 0) {
            this.setState({error: "No Reason Provided!"});
            return;
        }

        this.props.handleSubmit(this._unmuteReason.trim());
    }

    handleCancel = () => {
        this.setState({error: null});

        this.props.onCancel();
    }

    render() {
        const { show, userID } = this.props;

        if (!show) return null;
        
        return (
            <EditPopup
                onCancel={this.handleCancel}
                onConfirm={this.handleAllowSubmit}
                title={"Unpunish User"}
                componentName={"unpunish-user"}
                confirmText={"Unpunish"}
            >
                Are you sure you want to unpunish (both unmute and unban) the user {userID}?
                <br/><br/>
                Unpunish Reason: 
                <TextInput valueUpdateCallback={this.handleValueUpdate} placeholder={"Unpunish Reason..."} error={this.state.error}/>
                <br/><br/>
            </EditPopup>
        );
    }
}

export default UnpunishConfirm;