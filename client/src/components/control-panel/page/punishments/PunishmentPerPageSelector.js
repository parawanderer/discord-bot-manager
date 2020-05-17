import React from 'react';
import EditPopup from '../../generic/EditPopup';


class PunishmentPerPageSelector extends React.Component{

    state = {
        selectedValue : 10
    };

    cancelHandler = () => {
        this.props.onCancel();
    };

    handleFormSubmission = () => {
        let newValue = this.state.selectedValue;

        if (newValue > 500) newValue = 500;
        else if (newValue < 10) newValue = 10;

        this.props.successfulSubmitCallback(newValue);
    };

    handleValueUpdate = (newValue) => {
        let val = parseInt(newValue);
        if (isNaN(val) || val < 10 || val > 500) {
            val = 10;
        }
        this.setState({selectedValue : val});
    };


    render() {

        if (!this.props.show) return null;


        return (
            <EditPopup
                onCancel={this.cancelHandler}
                onConfirm={this.handleFormSubmission}
                title={`Edit Punishments Per Page`}
                componentName={"punishments-per-page"}
                confirmText={"Edit"}
            >
                Select the number of results to show per page:

                <input 
                    type="number" 
                    min="10" 
                    max="500" 
                    value={this.state.selectedValue}
                    onChange={e => this.handleValueUpdate(e.target.value)} 
                />

            </EditPopup>
        );
    }
}

export default PunishmentPerPageSelector;