import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PathFinder from '../../../utils/PathFinder';

class Nav extends React.Component {

    isCurrentPage(path) {
        const clean = this.props.location.pathname.slice(1).toLowerCase();
        return path.toLowerCase() === clean;
    }

    renderNav() {
        const links = [];

        Object.keys(PathFinder.paths).forEach(path => {
            links.push(
                <li key={path}>
                    <Link 
                        to={`/${path}`} 
                        className={`navigation ${this.isCurrentPage(path) ? 'selected' : ''}`}
                    >
                        {PathFinder.getIcon(PathFinder.getName(path))}
                        {PathFinder.getName(path)}
                    </Link>
                </li>
            );
        });

        return links;
    }

    render() {
        return (
            <div className="sidebar-list">
            <nav className="main-nav">
                <ul>
                    {this.renderNav()}
                </ul>
            </nav>
            </div>
        );
    }
}


export default withRouter(Nav);