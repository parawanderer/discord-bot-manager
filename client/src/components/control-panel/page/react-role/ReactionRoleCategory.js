import React from 'react';
import ReactionRoleItem from './ReactionRoleItem';
import ToggleableTextInput from '../../generic/ToggleableTextInput';
import Button from '../../generic/Button';
import CreateRole from './CreateRole';

class ReactionRoleCategory extends React.Component {
    keys = null;

    constructor(props) {
        super(props);
        const { roles } = props.category;

        this.state = {
            showCreateRole : false
        };

        this.keys = Object.keys(roles);
    }


    renderRoleItems() {
        const { roles } = this.props.category;

        const list = this.keys.map((key, index) => {
            const role = roles[key];
            return (
                <ReactionRoleItem 
                    key={key} 
                    objectKey={key} 
                    role={role} 
                    position={index} 
                    roleItemsLength={this.keys.length} 
                    positionChangeHandler={this.changeObjectOrder}
                    deleteHandler={this.deleteRole}
                    categoryKeys={this.keys}
                />
            );
        });

        return (
            <div className="react-role-list">
                {list}
            </div>
        );
    }

    changeObjectOrder = (keyName, moveBy) => {
        const { roles } = this.props.category;

        if (!this.keys.includes(keyName)) return;

        const index = this.keys.indexOf(keyName);
        const newKeys = [...this.keys];
        newKeys.splice(index, 1);
        const newIndex = index + (moveBy);

        if (!(newIndex >= 0 && newIndex < this.keys.length)) return;

        // insert new key at new position:
        newKeys.splice(newIndex, 0, keyName);

        const newRoles = {};
        // re-create roles object based on new ordering..
        for (let i = 0; i < newKeys.length; i++) {
            const key = newKeys[i];
            const value = roles[key];
            newRoles[key] = value;
        }

        // replace old object with new object...

        this.keys = newKeys;
        this.props.category.roles = newRoles;
        this.forceUpdate();
    }

    deleteRole = (keyName) => {
        if (!this.keys.includes(keyName)) return;
        const index = this.keys.indexOf(keyName);

        // delete object
        this.keys.splice(index, 1);
        delete this.props.category.roles[keyName];


        // force reload.
        this.forceUpdate();
    }

    handleShowCreateRole = () => {
        this.setState({showCreateRole : true});
    }

    handleHideCreateRole = () => {
        this.setState({showCreateRole : false});
    };

    handleAddNewRole = (newRole) => {
        const { roles } = this.props.category;


        if (this.keys.includes(newRole.emoji)) return;
        const newKeys = [...this.keys];

        // add new role
        newKeys.push(newRole.emoji);

        const newRoles = {...roles, [newRole.emoji]: newRole};

        // replace old object with new object...
        this.keys = newKeys;
        this.props.category.roles = newRoles;

        this.handleHideCreateRole();
    }

    handleRemoveSelf = () => {
        const { name } = this.props.category; // name is also key
        this.props.handleRemove(name);
    }

    render() {

        const { roles } = this.props.category;
        this.keys = Object.keys(roles);

        const { category } = this.props;

        return (
            <React.Fragment>
                <div className="react-role-category">
                    <div className="react-role-category-top">
                        <button className="delete-react-category" onClick={this.handleRemoveSelf}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <h3>
                            Category "{category.name}"
                        </h3>
                    </div>
                    <div className="react-role-body">
                        <div className="react-role-description">
                            <ToggleableTextInput
                                value={category.description} 
                                placeholder="Category Description"
                                vallidationCallback={() => false}
                                valueUpdateCallback={(newValue) => {this.props.category.description = newValue || null; this.forceUpdate();}}
                                textArea={true}
                            />
                        </div>
                        <div className="react-role-divisor">
                            <div className="info-item">
                                <div className="info-title">Automatic Role:</div>
                                <div className="info-data">
                                    <ToggleableTextInput
                                        value={category.automaticRole} 
                                        placeholder="Automatic Role"
                                        vallidationCallback={() => false}
                                        valueUpdateCallback={(newValue) => {this.props.category.automaticRole = newValue || null; this.forceUpdate();}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="reaction-role-menu">
                            <Button 
                                text="Add New Role" 
                                classes="add-role-button" 
                                icon={<i className="fas fa-plus"></i>}
                                onClick={this.handleShowCreateRole}
                            />
                        </div>
                    </div>
                    {this.renderRoleItems()}
                </div>
                <CreateRole
                    show={this.state.showCreateRole} 
                    onCancel={this.handleHideCreateRole}
                    successfulSubmitCallback={this.handleAddNewRole}
                    emojisCurrentCategory={this.keys}
                />
            </React.Fragment>
        );
    }
}



export default ReactionRoleCategory;