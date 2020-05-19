import React from 'react';
import EditPopup from '../../generic/EditPopup';
import TextInput from '../../generic/TextInput';

class UnmuteConfirm extends React.Component {

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
                title={"Unmute User"}
                componentName={"unmute-user"}
                confirmText={"Unmute"}
            >
                Are you sure you want to unmute the user {userID}?
                <br/><br/>
                Unmute Reason: 
                <TextInput valueUpdateCallback={this.handleValueUpdate} placeholder={"Unmute Reason..."} error={this.state.error}/>
                <br/><br/>
            </EditPopup>
        );
    }
}

export default UnmuteConfirm;