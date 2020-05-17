import React from 'react';

class PunishmentSearch extends React.Component { 

    state = {
        currentOption : 'username'
    }

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

    render() {
        return (
            <div id="punishment-search">
                <div className="punish-search-box">
                    <input type="text" placeholder={this.getPlaceholderText()} className="punish-searcher"/>
                    <select id="search-by" name="search-by" onChange={(a) => this.handleChange(a.target.value)} >
                        <option value="username">Username</option>
                        <option value="with_discriminator">User#1234</option>
                        <option value="user_id">User ID</option>
                    </select>
                    <button className="punish-search-btn">
                        <i className="far fa-search"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default PunishmentSearch;