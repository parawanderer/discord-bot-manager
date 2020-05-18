import React from 'react';
import { withRouter } from 'react-router-dom';

import PathFinder from '../../../utils/PathFinder';

import CurrentUser from './CurrentUser';


class PageTop extends React.Component {

    getTitle() {

        const title = PathFinder.getName(this.props.location.pathname.slice(1).toLowerCase());

        if (title) {
            const icon = PathFinder.getIcon(title);
            return (
                <h2>
                    {icon}
                    {title}
                </h2>
            );
        }
        return (
            <h2>Unknown?</h2>
        );
    }

    render() {
        return (
            <div className="top" id="top">
                <div className="page-title">
                    {this.getTitle()}
                </div>
                <CurrentUser />
            </div>
        );
    }
}

export default withRouter(PageTop);