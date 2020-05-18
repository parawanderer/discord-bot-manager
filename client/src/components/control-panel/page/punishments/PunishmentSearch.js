import React from 'react';

class PunishmentSearch extends React.Component { 

    state = {
        currentOption : 'username'
    }

    _value = null;

    handleChange = (newValue) => {
        this.setState({currentOption : newValue});
    };

    getPlaceholderText() {
        switch(this.state.currentOption) {
            case 'username':
                return "Search by Username...";
            case 'with_discriminator':
                return "Search by Username#1234...";
            case 'user_id':
                return "Search by User ID...";
            default:
                return "Search...";
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const {searchHandler} = this.props
            searchHandler(this.state.currentOption, this._value);
        }
    }


    render() {
        const {searchHandler, error} = this.props;


        return (
            <div id="punishment-search">
                <div className={"punish-search-box" + (error ? ' with-error' : '')}>
                    <input type="text" placeholder={this.getPlaceholderText()} 
                        className="punish-searcher" 
                        onChange={(e) => this._value = e.target.value}
                        onKeyDown={this.handleKeyDown}
                    />
                    <select id="search-by" name="search-by" onChange={(a) => this.handleChange(a.target.value)} >
                        <option value="username">Username</option>
                        <option value="with_discriminator">User#1234</option>
                        <option value="user_id">User ID</option>
                    </select>
                    <button className="punish-search-btn" onClick={() => searchHandler(this.state.currentOption, this._value)}>
                        <i className="far fa-search"></i>
                    </button>
                </div>
                <div className="punish-search-error">
                    {error || null}
                </div>
            </div>
        );
    }
}

export default PunishmentSearch;