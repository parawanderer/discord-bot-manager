import React from 'react';

class ToggleButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = { toggled: this.props.state };
    }

    onClickHandler = () => {
        if (this.props.disabled) return;
        this.setState({toggled: !this.state.toggled}); // flip the switch

        if (this.props.onClick) this.props.onClick();

        this.handleValueUpdateCallback();
    };

    handleValueUpdateCallback = () => {
        if (this.props.valueUpdateCallback && this.props.propertyKey) {
            this.props.valueUpdateCallback(this.props.propertyKey, !this.state.toggled);
        }
    };


    render() {
        return (
            <button 
                className={`toggle-button${this.state.toggled ? ' toggled' : ''}${this.props.disabled ? ' disabled' : ''}`} 
                onClick={this.onClickHandler}
                disabled={this.props.disabled}
                >
                <i className="fas fa-circle"></i>
            </button>
        );
    }
}

export default ToggleButton;