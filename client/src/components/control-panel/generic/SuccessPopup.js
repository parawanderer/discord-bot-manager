import React from 'react';

import Button from './Button';


class SuccessPopup extends React.Component {

    render() {
        // this.props.text
        // this.props.title
        // this.props.onDismiss
        // this.props.show

        const {text, title, show, onDismiss} = this.props;

        if (!show) return null;
        
        return (
            <div id="success">
                <div className="success-top">
                    <i className="fal fa-check"></i>
                </div>
                <div className="success-text">
                    <h2 className="success-title">
                        {title || 'Success!'}
                    </h2>
                    <div className="success-text">
                        {text || ''}
                    </div>
                </div>
                <Button text="Ok" onClick={onDismiss}/>
            </div>
        );
    }
}

export default SuccessPopup;