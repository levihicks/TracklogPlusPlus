import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./PopularRow.module.css";

import Album from "../../../../components/Album/Album";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import * as actions from "../../../../store/actions";

class PopularRow extends Component {
  componentDidMount() {
    if (
      this.props.categories.filter((cat) => cat.name === this.props.category)
        .length === 0
    )
      this.props.categoryAdd(this.props.category);
  }

  render() {
    let showcase;
    let category = this.props.categories.filter(
      (cat) => cat.name === this.props.category
    )[0];
    if (this.props.loading) showcase = <Spinner />;
    else if (category) {
      showcase = category.albums.map((album) => (
        <Album
          title={album.name}
          artist={album.artist}
          key={Math.random().toString()}
          img={album.img}
        />
      ));
    } else if (this.props.error) showcase = <p>Error loading albums.</p>;
    return (
      <div className={classes.PopularRow}>
        <div className={classes.HeaderBlock}></div>
        <div className={classes.Header}>{this.props.category}</div>
        <div className={classes.Showcase}>{showcase}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.browser.categories,
    error: state.browser.error,
    loading: state.browser.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryAdd: (category) => dispatch(actions.addCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularRow);
