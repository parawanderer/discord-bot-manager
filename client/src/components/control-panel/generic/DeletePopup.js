import React from 'react';

import Button from './Button';
import CloseButton from './CloseButton';

class DeletePopup extends React.Component {


    render() {
        // this.props.onCancel
        // this.props.onConfirm
        // this.props.children
        // this.props.title
        // this.props.componentName
        // this.props.removeText?

        const {onCancel,onConfirm, children, title, componentName} = this.props;

        const removeText = this.props.removeText || `Delete ${componentName.slice(0,1).toUpperCase() + componentName.slice(1).toLowerCase()}`;

        return (
            <div className={`delete-popup delete-${componentName} popup`} id={`delete_${componentName}`} >
                <CloseButton id={`close_${componentName}_delete`} onClick={onCancel} />
                <h3 className="block-title">{title}</h3>
                <div className={`popup-body delete-popup-body delete-${componentName}-body`}>
                    {children}
                </div>
                <div className="delete-popup-buttons popup-buttons">
                    <Button text="Cancel" classes="cancel" onClick={onCancel} />
                    <Button text={removeText} icon={<i className="fas fa-trash-alt"></i>} classes={`delete-${componentName}`} onClick={onConfirm} />
                </div>
            </div>
        );
    }
}

export default DeletePopup;