import React from 'react';
import Button from '../../generic/Button';

class WordsList extends React.Component {



    handleEdit = (word) => {
        console.log("handleEdit", word)
    };

    handleDelete = (word) => {
        console.log("handleDelete", word)
    };

    handleNew = () => {
        console.log("handleNew");
    };
    
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

    renderRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{this.getType(item.raw_type)}</td>
                <td>{item.data}</td>
                <td>
                    <div className="table-options">
                        <button className="table-button table-edit" onClick={() => this.handleEdit(item)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="table-button table-delete" onClick={() => this.handleDelete(item)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    };


    render() {
        // this.props.words
        // this.props.show?
        console.log(this.props.words);


        return (
            <div className={`filter-section filter-words-list${this.props.show ? ' shown' : ''}`}>
                <Button icon={<i className="fas fa-plus"></i>} text="Add Word" onClick={this.handleNew} classes="add-word" />
                <h3 className="block-title">
                    Words Filter
                    <span className="list-count">
                        {this.props.words.length}
                    </span>
                </h3>

                <table><tbody>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>Word</th>
                        <th>Options</th>
                    </tr>
                    {this.props.words.map(word => this.renderRow(word))}
                </tbody></table>
            </div>
        );
    }
}

export default WordsList;