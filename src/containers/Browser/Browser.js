import React, { Component } from 'react';
import {Route} from 'react-router-dom';
//import Searchbar from './Searchbar/Searchbar';
import Popular from './Popular/Popular';
import classes from './Browser.module.css';
import AlbumPage from './AlbumPage/AlbumPage';
import Searchbar from './Searchbar/Searchbar';
import SearchResults from './SearchResults/SearchResults';

class Browser extends Component {

    state = {
        query: false
    }  

    setQuery = (query) => {
        this.setState((prevState, prevProps) => {
            if (prevState.query !== query)
                return {query: query};
        });
    }

    render() {
        const mainView = (props) => (
            <React.Fragment>
                <Searchbar
                    setQuery={this.setQuery}  
                    val={this.state.query}/>
                {this.state.query
                    ?<SearchResults 
                        query={this.state.query} />
                    :<Popular {...props}/>}
            </React.Fragment>
        );
        return (
            <div className={classes.Browser}>
                <Route path="/" exact render={(props)=>mainView(props)} />
                <Route path="/albumInfo" component={AlbumPage} />
                {/*this.state.currentView*/}
            </div>
        );
    }
}

export default Browser;