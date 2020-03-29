import React from 'react';
import { Link } from 'react-router-dom';


class NavLogo extends React.Component {

    render() {
        return (
            <div className="sidebar-top">
                <div className="logo-container">
                    <Link to="/">
                        <i className="fab fa-discord logo"></i>
                    </Link>
                </div>
                <div className="titles">
                    <h5 className="main-title">Bot Manager</h5>
                    <h6 className="sub-title">Control Panel</h6>
                </div>
            </div>
        );
    }
}

export default NavLogo;