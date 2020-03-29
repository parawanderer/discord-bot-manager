import React from 'react';


class TextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = { value : props.value ? props.value : '' };
    } 

    updateValue = (event) => {
        this.setState({value : event.target.value});
        const newValue = event.target.value;
        
        this.props.valueUpdateCallback(newValue); // pass on the new value to the callback.
    };

    render () {

        return (
            <div className="text-field">
                <input 
                    id={this.props.id} 
                    name={this.props.name} 
                    className={this.props.className} 
                    type="text" 
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.updateValue}
                />
                <div className="text-field-error">{this.props.error}</div>
            </div>
        );
    }
}

export default TextInput;