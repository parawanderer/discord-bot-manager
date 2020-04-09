import React from 'react';
import Button from '../../generic/Button';

class LinksList extends React.Component {


    handleEdit = (link) => {
        console.log("handleEdit", link);
    }

    handleDelete = (link) => {
        console.log("handleDelete", link);
    };

    handleNew = () => {
        console.log("handleNew");
    };


    renderRow = (item) => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.url}</td>
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
        // this.props.links
        // this.props.show?
        console.log(this.props.links)

        return (
            <div className={`filter-section filter-links-list${this.props.show ? ' shown' : ''}`}>
                <Button icon={<i className="fas fa-plus"></i>} text="Add Whitelisted Link" onClick={this.handleNew} classes="add-link" />
                <h3 className="block-title">
                    Links Whitelist
                    <span className="list-count">
                        {this.props.links.length}
                    </span>
                </h3>
                <div className="explain links-explain">
                    Every link is filtered automatically! 
                    Exceptions should be added to this list in order to allow them to be posted!
                </div>

                <table><tbody>
                    <tr>
                        <th>Id</th>
                        <th>Link</th>
                        <th>Options</th>
                    </tr>
                    {this.props.links.map(link => this.renderRow(link))}
                </tbody></table>
            </div>
        );
    }
}

export default LinksList;