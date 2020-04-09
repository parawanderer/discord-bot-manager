import React from 'react';
import {connect} from 'react-redux';

import { fetchWhitelistedLinks, fetchFilteredWords } from '../../../../action';

import Button from '../../generic/Button';
import Loading from '../../generic/Loading';
import LinksList from './LinksList';
import WordsList from './WordsList';



class Filter extends React.Component {

    state = {
        selectedWords: true
    };

    componentDidMount() {
        this.props.fetchFilteredWords();
        this.props.fetchWhitelistedLinks();
    }

    selectWords = () => {
        this.setState({selectedWords : true});
    };

    selectLinks = () => {
        this.setState({selectedWords : false});
    };




    render() {

        if (!this.props.filter || !this.props.filter.words || !this.props.filter.links) {
            return <Loading/>
        }

        return (
            <div id="filter">
                <div className="filter-selector">
                    <Button 
                        text="Words Filter" 
                        icon={<i className="fas fa-eye-slash"></i>}
                        onClick={this.selectWords}  
                        classes={`filter-selector${this.state.selectedWords ? ' selected' : ''}`}
                    />
                    <Button 
                        text="Links Whitelist" 
                        icon={<i className="fas fa-check-square"></i>}
                        onClick={this.selectLinks}  
                        classes={`filter-selector${!this.state.selectedWords ? ' selected' : ''}`}
                    />
                </div>

                <div className="filter-block">
                    
                    <div className="filter-body">
                        <WordsList 
                            show={this.state.selectedWords}
                            words={this.props.filter.words}
                         />
                        <LinksList 
                            show={!this.state.selectedWords}
                            links={this.props.filter.links}
                        />
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter
    }
};

export default connect(mapStateToProps, { fetchFilteredWords, fetchWhitelistedLinks})(Filter);