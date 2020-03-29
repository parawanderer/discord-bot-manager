import React from 'react';

const ErrorPopup = (props) => {

    let errors = props.errors;

    if (typeof errors === typeof "") {
        errors = [errors];
    }

    const getErrors = (errors) => {
        return errors.map((error, i) => {
            return (
                <div key={i} className="error">
                    <i className="fad fa-exclamation-triangle"></i>
                    <span>{error}</span>
                </div>
            );
        });
    };

    return (
        <div className="error-block">
            {getErrors(errors)}
        </div>
    );
};

export default ErrorPopup;