import React from 'react';

import DeletePopup from '../../generic/DeletePopup';

class DeleteLink extends React.Component {

    renderWord() {
        return (
            <div className="delete-link-sample">
                {this.props.link.url}
            </div>
        );
    }

    render() {

        // this.props.word

        if (!this.props.link || !this.props.show) return null;


        return (
            <DeletePopup
                onCancel={this.props.onCancel}
                onConfirm={this.props.onDeleteConfirm}
                title={"Delete Link"}
                componentName={"word"}
                removeText={"Delete Link"}
            >
                Are you sure you want to delete this link from the whitelist? 
                {this.renderWord()}
            </DeletePopup>
        );
    }
}

export default DeleteLink;