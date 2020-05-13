import React from 'react';
import { connect } from 'react-redux';


import { updateFilteredWord, removeFilteredWord, addFilteredWord } from '../../../../action';


import Button from '../../generic/Button';

import DeleteWord from './DeleteWord';
import EditWord from './EditWord';
import AddWord from './AddWord';
import SuccessPopup from '../../generic/SuccessPopup';

class WordsList extends React.Component {

    lastId = null;

    state = {
        showDelete: false,
        showEdit: false,
        showCreate: false,

        showSuccessEdit : false,
        showSuccessAdd : false,
        showSuccessDelete : false,

        currentWord: null,
    };

    handleEdit = (word) => {
        this.setState({
            currentWord: word,
            showEdit: true
        });
        this.lastId = word.id;
    };

    closeEdit = () => {
        this.setState({
            currentWord: null,
            showEdit: false
        });
    };

    successfulEditCallback = async (data) => {
        //close editor
        this.closeEdit();

        // edit
        await this.props.updateFilteredWord(data.id, data);

        // announce success
        this.showSuccessEdit();
    };


    handleDelete = (word) => {
        this.setState({
            currentWord: word,
            showDelete: true
        });
        this.lastId = word.id;
    };

    closeDelete = () => {
        this.setState({
            currentWord: null,
            showDelete: false
        });
    };

    confirmDelete = async () => {
        // the current word is in state...
        if (!this.state.currentWord) return; // sanity check
        const id = this.state.currentWord.id;

        // close confirmation
        this.closeDelete();

        // delete
        await this.props.removeFilteredWord(id);

        // announce success
        this.showSuccessDelete();
    };


    handleNew = () => {
        this.setState({
            showCreate: true
        });
    };


    closeNew = () => {
        this.setState({
            showCreate: false
        });
    }


    successfulNewCallback = async (data) => {
        // hide editor
        this.closeNew();

        // add
        await this.props.addFilteredWord(data);

        // show success
        this.showSuccessAdd();
    };


    showSuccessAdd = () => {
        this.setState({showSuccessAdd : true});
    };

    hideSuccessAdd = () => {
        this.setState({showSuccessAdd : false});
    };

    showSuccessEdit = () => {
        this.setState({showSuccessEdit : true});
    };

    hideSuccessEdit = () => {
        this.setState({showSuccessEdit : false});
    };

    showSuccessDelete = () => {
        this.setState({showSuccessDelete : true});
    };

    hideSuccessDelete = () => {
        this.setState({showSuccessDelete : false});
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
                <td>
                    <div className="filter-inner-block"><pre>{item.data}</pre></div>
                </td>
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

        return (
            <React.Fragment>
                <div className="left"  style={{display : this.props.show ? 'inline-block' : 'none'}}>
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
                </div>
                <div className="right"  style={{display : this.props.show ? 'inline-block' : 'none'}}>
                    <div className={`infobar${this.props.show ? ' shown' : ''}`}>
                        <div className="explain">
                            <h3>Regarding The Words Listed</h3>
                            The words are displayed in a way where outer spaces (all spaces) are preserved.
                            <br/> 
                            A line to the left and the right of every word is given to allow you to visually make out if a certain word has trailing or leading spaces.
                            <br/><br/>
                            <h3>Regarding The Editor</h3>
                            The editor is very much <b>space sensitive</b>!! 
                            <br/>
                            Do <b>NOT</b> inclide leading or trailing spaces for whitelist or containing matches if 
                            you do not intend to only have it be matched with the leading and trailing spaces!
                            <br/><br/>
                            <h3>The logic of the filter works as follows:</h3>
                            <ol>
                                <li>
                                    <div className="filter-type exact">Exact</div> matches are matched first. This works by breaking 
                                    every set of characters separated by a space and considering it a "word", converting every word to generic characters (see below), 
                                    and then matching it against 
                                    every word added as <div className="filter-type exact">Exact</div>.
                                    <br/>
                                    This is the fastest type of matching (and the safest). Spaces are <b>not</b> allowed here.<br/>
                                    This matching is as the name implies (and is case insensitive). If an exact match is found the message
                                     will be filtered/deleted and logged.
                                     <br/>
                                     <br/>
                                     Exact overrules both Whitelist and comes before Containing. 
                                </li>
                                <br/>
                                <li>
                                    Should there have been no exact messages in a message, the <div className="filter-type containing">Containig</div> filter 
                                    is applied to the message.<br/>
                                    This is <b>significantly</b> slower, but allows space-insensitive matching (e.g. <pre>f u c k</pre>), space-sensitive
                                     string matching (e.g. <pre>kill yourself</pre>), and matching of special characters e.g. <pre>ⓕⓤⓒⓚ</pre>.<br/>
                                    In the latter case, special characters are casted to their "closest best generic character" (<pre>ⓕ</pre> => <pre>f</pre>) 
                                    and matched against any words or strings with spaces of the <div className="filter-type containing">Containig</div> type.
                                    <br/>
                                    <br/>
                                    Did I mention that this is slow? Especially if a lot of these words exist. And error-prone for short words such as "ass". 
                                    <br/>Short words can be added theoretically by adding it as <pre> ass </pre> (notice the leading and trailing space)
                                     but is not recommended for reasons explained above.
                                </li>
                                <br/>
                                <li>
                                    If in step 1 or step 2 a match was found, this will be matched against the <div className="filter-type whitelist">Whitelist</div>. 
                                    The whitelist overrules both exact and included matches.
                                    <br/><br/>
                                    E.g. If "assassin" is used in a message, and "ass" is filtered as <div className="filter-type included">Included</div>,
                                     but "assassin" is added as <div className="filter-type whitelist">Whitelist</div>, then "assassin" specifically will not get filtered. 
                                    If a sentence such as "assassin's ass" is said, "assassin" will be disregarded, but the second stand-alone "ass" 
                                    will be detected and filtered. 
                                </li>
                            </ol>
                            <b>Note:</b> Admin Roles and Bot Admins bypass the filtering system.
                        </div>
                    </div>
                </div>

                <DeleteWord 
                    word={this.state.currentWord}
                    show={this.state.showDelete}
                    onCancel={this.closeDelete}
                    onDeleteConfirm={this.confirmDelete}
                />

                <EditWord
                    word={this.state.currentWord}
                    show={this.state.showEdit}
                    onCancel={this.closeEdit}
                    successfulSubmitCallback={this.successfulEditCallback}
                />

                <AddWord
                    show={this.state.showCreate}
                    onCancel={this.closeNew}
                    successfulSubmitCallback={this.successfulNewCallback}
                />


                <SuccessPopup 
                    key={'edit'}
                    text={`Word with the id ${this.lastId} has been edited successfully!`}
                    show={this.state.showSuccessEdit}
                    onDismiss={this.hideSuccessEdit}
                />

                <SuccessPopup 
                    key={'new'}
                    text={`New word has been added successfully!`}
                    show={this.state.showSuccessAdd}
                    onDismiss={this.hideSuccessAdd}
                />

                <SuccessPopup 
                    key={'delete'}
                    text={`Word with the id ${this.lastId} has been deleted successfully!`}
                    show={this.state.showSuccessDelete}
                    onDismiss={this.hideSuccessDelete}
                />
                

            </React.Fragment>
        );
    }
}

export default connect(null, {updateFilteredWord, removeFilteredWord, addFilteredWord})(WordsList);