import React from 'react';
import EditPopup from '../../generic/EditPopup';
import TextInput from '../../generic/TextInput';

class UnbanConfirm extends React.Component {

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
                title={"Unban User"}
                componentName={"unban-user"}
                confirmText={"Unban"}
            >
                Are you sure you want to unban the user {userID}?
                <br/><br/>
                Unban Reason: 
                <TextInput valueUpdateCallback={this.handleValueUpdate} placeholder={"Unban Reason..."} error={this.state.error}/>
                <br/><br/>
            </EditPopup>
        );
    }
}

export default UnbanConfirm;