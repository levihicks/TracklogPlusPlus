import React, { Component } from "react";

import classes from "./Popular.module.css";

import PopularRow from "./PopularRow/PopularRow";

const POPULAR_CATEGORIES = ["Indie", "Classical", "Jazz", "Electronic"];

class Popular extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={classes.Popular} style={this.props.style}>
        <div className={classes.TopFiveHeader}>Top Five</div>
        {POPULAR_CATEGORIES.map((cat) => (
          <PopularRow category={cat} key={cat} />
        ))}
      </div>
    );
  }
}

export default Popular;
