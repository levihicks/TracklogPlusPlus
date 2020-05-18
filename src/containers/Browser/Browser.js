import React, { Component } from "react";
import { Route } from "react-router-dom";

import classes from "./Browser.module.css";

import Popular from "./Popular/Popular";
import AlbumPage from "./AlbumPage/AlbumPage";
import Searchbar from "./Searchbar/Searchbar";
import SearchResults from "./SearchResults/SearchResults";

class Browser extends Component {
  state = {
    query: false,
  };

  setQuery = (query) => {
    this.setState((prevState, prevProps) => {
      if (prevState.query !== query) return { query: query };
    });
  };

  render() {
    const mainView = (props) => (
      <>
        <Searchbar setQuery={this.setQuery} val={this.state.query} />
        {this.state.query ? (
          <SearchResults query={this.state.query} />
        ) : (
          <Popular {...props} />
        )}
      </>
    );
    return (
      <div className={classes.Browser}>
        <Route path="/" exact render={(props) => mainView(props)} />
        <Route path="/albumInfo" component={AlbumPage} />
      </div>
    );
  }
}

export default Browser;
