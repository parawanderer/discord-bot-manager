import React from 'react';

class EditButton extends React.Component {

    render() {
        return (
            <button className="edit-button" onClick={this.props.onClick}>
                <i className="fas fa-edit"></i>
            </button>
        );
    }
}

export default EditButton;