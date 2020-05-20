import React from 'react';
import ToggleableTextInput from '../../generic/ToggleableTextInput';
import ChooseEmoji from './ChooseEmoji';

const RANDOM_COLOURS = [
    '#f55252',
    '#f57952',
    '#f5b552',
    '#f5e252',
    '#bdf552',
    '#5bf552',
    '#52f5a4',
    '#52f5c2',
    '#52f4f5',
    '#52bff5',
    '#5274f5',
    '#6c52f5',
    '#a152f5',
    '#dd52f5',
    '#f552c2',
    '#f55285'
];

class ReactionRoleItem extends React.Component {

    static _lastRandom = {
        last: null,
        preLast: null
    };

    ownColor = null;

    state = {
        showEmojiEditor: false
    };

    constructor(props) {
        super(props);
        this.ownColor = ReactionRoleItem.getRandomColor();
        this.state = {
            showEmojiEditor: false
        };
    }

    validateRoleCallback = (data) => {
        const newData = data.trim();
        if (newData === '') return 'Role may not be empty!';
        return false;
    };

    validateDescriptionCallback = (data) => {
        return false;
    }

    

    renderEmojiType() {
        const { role } = this.props;

        if (role.emojiType === 1) {
            return (
                <div className="react-item-emoji regular">
                    Regular
                </div>
            );
        }
        return (
            <div className="react-item-emoji custom">
                Custom
            </div>
        );
    }

    handleShowEmojiEditor = () => {
        this.setState({showEmojiEditor : true})
    }

    handleCloseEmojiEditor = () => {
        this.setState({showEmojiEditor : false})
    }

    successfulSubmitCallback = (newValue) => {
        // this will always be a traditional emoji, so we will update it like this.
        const { role } = this.props;

        role.emojiType = 1;
        role.emoji = newValue;
        role.emojiTypePretty = "DEFAULT";

        this.handleCloseEmojiEditor();
    }

    canMoveUp() {
        const {  position, roleItemsLength } = this.props;

        return position !== 0 && roleItemsLength > 1;
    }

    canMoveDown() {
        const {  position, roleItemsLength } = this.props;

        return position !== roleItemsLength -1 && roleItemsLength > 1;
    }

    handleMoveUp = () => {
        if (!this.canMoveUp()) return;
        const {positionChangeHandler, objectKey} = this.props;

        positionChangeHandler(objectKey, -1);
    }

    handleMoveDown = () => {
        if (!this.canMoveDown()) return;
        const {positionChangeHandler, objectKey} = this.props;

        positionChangeHandler(objectKey, 1);
    }

    handleDelete = () => {
        const {deleteHandler, objectKey} = this.props;
        deleteHandler(objectKey);
    }


    render() {

        const { role, categoryKeys } = this.props;


        return (
            <React.Fragment>
                <div className="react-role-list-item" style={{borderLeftColor: this.ownColor}}>
                    <div className="react-role-list-item-menu">
                        <button className="react-role-list-move-up" 
                            disabled={!this.canMoveUp()}
                            onClick={this.handleMoveUp}
                        >
                            <i className="fas fa-arrow-up"></i>
                        </button>
                        <button className="react-role-list-move-down" 
                            disabled={!this.canMoveDown()}
                            onClick={this.handleMoveDown}
                        >
                            <i className="fas fa-arrow-down"></i>
                        </button>
                        <button className="react-role-list-delete"
                            onClick={this.handleDelete}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div className="info-item">
                        <div className="info-title">Emoji:</div>
                        <div className="info-data">
                            {role.emoji}
                            {this.renderEmojiType()}
                            <button className="edit-button edit-emoji" onClick={this.handleShowEmojiEditor}>
                                <i className="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-title">Role:</div>
                        <div className="info-data">
                            <ToggleableTextInput
                                value={role.role} 
                                placeholder="Role Name"
                                vallidationCallback={this.validateRoleCallback}
                                valueUpdateCallback={(newValue) => {this.props.role.role = newValue; this.forceUpdate();}}
                            />
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="info-title">Description:</div>
                        <div className="info-data">
                            <ToggleableTextInput
                                value={role.description} 
                                placeholder="Description..."
                                vallidationCallback={this.validateDescriptionCallback}
                                valueUpdateCallback={(newValue) => {this.props.role.description = newValue || null; this.forceUpdate();}}
                                textArea={true}
                            />
                        </div>
                    </div>
                </div>
                <ChooseEmoji
                    show={this.state.showEmojiEditor} 
                    onCancel={this.handleCloseEmojiEditor}
                    successfulSubmitCallback={this.successfulSubmitCallback}
                    currentEmoji={role.emoji}
                    categoryKeys={categoryKeys}
                />
            </React.Fragment>
        );
    }

    static getRandomColor() {
        let random;
        while(true) {
            random = Math.floor(Math.random() * RANDOM_COLOURS.length);
            if (random !== ReactionRoleItem._lastRandom.last && random !== ReactionRoleItem._lastRandom.preLast) break;
        }
        ReactionRoleItem._lastRandom.preLast = ReactionRoleItem._lastRandom.last;
        ReactionRoleItem._lastRandom.last = random;

        return RANDOM_COLOURS[random];
    }

}



export default ReactionRoleItem;