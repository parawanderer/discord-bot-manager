import React from 'react';
import { connect } from 'react-redux';

import { fetchDataConfig, updateDataConfig } from '../../../../action';
import Loading from '../../generic/Loading';
import ReactionRoleCategory from './ReactionRoleCategory';
import Button from '../../generic/Button';
import CreateCategory from './CreateCategory';


class ReactionRoleSystem extends React.Component {

    _canUpdate = true;
    reactionRoleCopy = null;

    state = {
        showCreateCategory: false,
        lastRender : -1
    };

    componentDidMount() {
        this.props.fetchDataConfig()
            .then(() => {
                const { config } = this.props; 
                if (!config || !config.data) return;

                // deep clone
                this.reactionRoleCopy = JSON.parse(JSON.stringify(config.data.reactionRoleSystem));
                this.forceUpdate();
            });
    };

    handleReset = () => {
        const { config } = this.props;

        // deep clone
        this.reactionRoleCopy = JSON.parse(JSON.stringify(config.data.reactionRoleSystem));
        this.setState({lastRender : new Date().getTime()});
    };

    handleShowCreateCategory= () => {
        this.setState({showCreateCategory : true});
    };

    handleHideCreateCategory = () => {
        this.setState({showCreateCategory : false});
    };

    handleAddNewCategory = (newRole) => {
        if (Object.keys(this.reactionRoleCopy).includes(newRole.name)) return;

        this.reactionRoleCopy[newRole.name] = newRole;

        this.handleHideCreateCategory();
    };

    handleDeleteCategory = (categoryKey) => {
        if (!Object.keys(this.reactionRoleCopy).includes(categoryKey)) return;

        delete this.reactionRoleCopy[categoryKey];
        this.forceUpdate();
    };

    saveChanges = async () => {
        if (!this._canUpdate) return; // already in the process of updating..
        this._canUpdate = false;

        const {data} = this.props.config;
        // take a deep copy of the current data config
        const dataConfig = JSON.parse(JSON.stringify(data));
        
        // update the reaction role system to the modified version
        dataConfig.reactionRoleSystem = this.reactionRoleCopy;

        // send off to API for update...
        await this.props.updateDataConfig(dataConfig);

        // allow updating again at the end of this
        this._canUpdate = true;
    }


    renderInner() {

        const keys = Object.keys(this.reactionRoleCopy);

        const categories = keys.map(key => {
            const category = this.reactionRoleCopy[key];
            return <ReactionRoleCategory category={category} key={key} handleRemove={this.handleDeleteCategory}/>
        });

        return (
            <div id="react-role">
                <div className="react-role-top-menu">
                    <Button
                        text="Reset Changes"
                        classes="cancel" 
                        onClick={this.handleReset}
                    />
                    <Button 
                        text="Add New Category"
                        classes="add-category-button" 
                        icon={<i className="fas fa-plus"></i>}
                        onClick={this.handleShowCreateCategory}
                    />
                </div>
                {categories}
                <div className="react-role-save-container">
                    <button className="react-role-save" onClick={this.saveChanges}>
                        <i className="fal fa-save"></i>
                    </button>
                </div>
                <CreateCategory
                    show={this.state.showCreateCategory} 
                    onCancel={this.handleHideCreateCategory}
                    successfulSubmitCallback={this.handleAddNewCategory}
                    allCategories={Object.keys(this.reactionRoleCopy)}
                />
            </div>
        );
    }


    render() {

        const { config } = this.props; 

        if (!config || !config.data || !this.reactionRoleCopy) return <Loading/>;

        return this.renderInner();
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.config
    };
};

export default connect(mapStateToProps, { fetchDataConfig, updateDataConfig })(ReactionRoleSystem);