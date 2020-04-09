import React from 'react';

import Button from './Button';
import CloseButton from './CloseButton';

class EditPopup extends React.Component {


    render() {
        // this.props.onCancel
        // this.props.onConfirm
        // this.props.children
        // this.props.title
        // this.props.componentName
        // this.props.confirmIcon?
        // this.props.confirmText?

        const {onCancel,onConfirm, children, title, componentName} = this.props;

        const confirmText = this.props.confirmText || `Save ${componentName.slice(0,1).toUpperCase() + componentName.slice(1).toLowerCase()}`;
        const confirmIcon = this.props.confirmIcon || null;

        return (
            <div className={`edit-popup edit-${componentName} popup`} id={`edit_${componentName}`} >
                <CloseButton id={`close_${componentName}_edit`} onClick={onCancel} />
                <h3 className="block-title">{title}</h3>
                <div className={`popup-body edit-popup-body edit-${componentName}-body`}>
                    {children}
                </div>
                <div className="edit-popup-buttons popup-buttons">
                    <Button text="Cancel" classes="cancel" onClick={onCancel} />
                    <Button text={confirmText} icon={confirmIcon} classes={`edit-${componentName}`} onClick={onConfirm} />
                </div>
            </div>
        );
    }
}

export default EditPopup;