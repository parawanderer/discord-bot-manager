import React from 'react';
import Button from '../../generic/Button';


class WordTypeSelection extends React.Component {

    passToCallback = (value) => {

        if (this.props.typeSelectionCallback) this.props.typeSelectionCallback(value);
    };

    render () {
        // this.props.typeSelectionCallback
        // this.props.currentSelection (0/1/2)

        return (
            <div className="word-type-selector">
                <Button 
                    text="Exact" 
                    classes={`word-type word-type-exact${(this.props.currentSelection || this.props.currentSelection === 0) && this.props.currentSelection === 1 ? ' current' : ''}`} 
                    onClick={() => this.passToCallback(1)} 
                />
                <Button 
                    text="Containing" 
                    classes={`word-type word-type-containing${(this.props.currentSelection || this.props.currentSelection === 0) && this.props.currentSelection === 2 ? ' current' : ''}`} 
                    onClick={() => this.passToCallback(2)} 
                />
                <Button 
                    text="Whitelist" 
                    classes={`word-type word-type-whitelist${(this.props.currentSelection || this.props.currentSelection === 0) && this.props.currentSelection === 0 ? ' current' : ''}`} 
                    onClick={() => this.passToCallback(0)}
                />
            </div>
        );
    }
}

export default WordTypeSelection;