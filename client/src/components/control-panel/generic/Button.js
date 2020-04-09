import React from 'react';


class Button extends React.Component {

    // icon
    // text
    // onClick callback
    // classes

    render() {

        this.icon = this.props.icon || null;
        this.text = this.props.text || "Button";
        this.onClick = this.props.onClick || null;
        this.classes = this.props.classes || '';
        this.idItem = this.props.id || null;

        return (
        <button className={`button ${this.classes}`} onClick={this.onClick} id={this.idItem}>
            {this.icon}
            {this.text}
        </button>);
    }
}

export default Button;