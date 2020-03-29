import React from 'react';

const Loading = (props) => {
    
    const getLoadText = () => {
        if (!props.text) {
            return "Loading";
        }
        return props.text;
    };

    return (
        <div className="loading">
            <i className="fad fa-spinner-third"></i>
            <span>{getLoadText()}</span>
        </div>
    );
};

export default Loading;