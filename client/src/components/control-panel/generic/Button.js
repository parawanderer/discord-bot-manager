import React from 'react';


class Button extends React.Component {

    // icon
    // text
    // onClick callback
    // classes

    render() {

        const icon = this.props.icon || null;
        const text = this.props.text || "Button";
        const onClick = this.props.onClick || null;
        const classes = this.props.classes || '';
        const idItem = this.props.id || null;
        const disabled = this.props.disabled || false;

        return (
        <button className={`button ${classes}` + (disabled ? ' disabled' : '')} onClick={onClick} id={idItem} disabled={disabled}>
            {icon}
            {text}
        </button>);
    }
}

export default Button;