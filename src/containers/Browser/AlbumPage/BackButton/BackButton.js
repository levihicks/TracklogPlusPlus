import React, { Component } from "react";
import { Link } from "react-router-dom";

import classes from "./BackButton.module.css";

import BackIcon from "../../../../assets/icons/back_arrow.svg";

class BackButton extends Component {
  state = {
    hovering: false,
  };

  render() {
    return (
      <Link
        className={classes.BackButton}
        onMouseOver={() => {
          this.setState({ hovering: true });
        }}
        onMouseOut={() => {
          this.setState({ hovering: false });
        }}
        to="/"
      >
        <img alt="Back Arrow" src={BackIcon} className={classes.BackIcon} />
        Back
      </Link>
    );
  }
}

export default BackButton;
