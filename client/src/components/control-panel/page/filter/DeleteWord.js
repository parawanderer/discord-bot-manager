import React from 'react';

import DeletePopup from '../../generic/DeletePopup';

class DeleteWord extends React.Component {


    getType = (rawType) => {
        switch (rawType) {
            case 1:
                return <div className="filter-type exact">Exact</div>;
            case 2:
                return <div className="filter-type containing">Containing</div>;
            case 0:
                return <div className="filter-type whitelist">Whitelist</div>;
            default:
                return <div className="filter-type">Unknown</div>;
        }
    }



    renderWord() {
        return (
            <div className="delete-word-sample">
                {this.getType(this.props.word.raw_type)} {this.props.word.data}
            </div>
        );
    }


    render() {

        // this.props.word

        if (!this.props.word || !this.props.show) return null;


        return (
            <DeletePopup
                onCancel={this.props.onCancel}
                onConfirm={this.props.onDeleteConfirm}
                title={"Delete Word"}
                componentName={"word"}
                removeText={"Delete Word"}
            >
                Are you sure you want to delete this word from the filter? 
                {this.renderWord()}
            </DeletePopup>
        );
    }
}

export default DeleteWord;