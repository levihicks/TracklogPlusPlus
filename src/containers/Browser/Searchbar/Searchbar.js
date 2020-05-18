import React, { Component } from "react";

import classes from "./Searchbar.module.css";

import searchIcon from "../../../assets/icons/search.svg";
import clearInputIcon from "../../../assets/icons/clear_input.svg";
import clearInputIconHover from "../../../assets/icons/clear_input_hover.svg";

class Searchbar extends Component {
  state = {
    val: "",
    clearInputHover: false,
  };

  componentDidMount() {
    this.timer = null;
    this.setState((prevState, prevProps) => {
      if (typeof prevProps.val === "string") return { val: prevProps.val };
    });
  }

  searchChangeHandler = (inputVal) => {
    this.setState({ val: inputVal });
    this.props.setQuery(inputVal !== "");
    if (this.timer) clearTimeout(this.timer);
    if (inputVal)
      this.timer = setTimeout(() => {
        this.props.setQuery(inputVal);
      }, 1000);
  };

  render() {
    return (
      <div className={classes.Searchbar}>
        <img
          alt="Search Icon"
          src={searchIcon}
          className={classes.SearchIcon}
        />
        <input
          onChange={(e) => {
            this.searchChangeHandler(e.target.value);
          }}
          placeholder="Search for an album..."
          value={this.state.val}
        />
        {this.state.val.length > 0 && (
          <img
            onMouseEnter={() => {
              this.setState({ clearInputHover: true });
            }}
            onMouseLeave={() => {
              this.setState({ clearInputHover: false });
            }}
            alt="Clear Input Icon"
            src={
              this.state.clearInputHover ? clearInputIconHover : clearInputIcon
            }
            onClick={() => {
              this.searchChangeHandler("");
            }}
            className={classes.ClearInputIcon}
          />
        )}
      </div>
    );
  }
}

export default Searchbar;
