import React from 'react';

class CloseButton extends React.Component {
    render() {
        return (
            <button id={this.props.id}  className="popup-close" onClick={this.props.onClick}>
                <i className="far fa-times"></i>
            </button>
        );
    }
}

export default CloseButton;