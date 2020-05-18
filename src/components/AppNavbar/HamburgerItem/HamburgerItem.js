import React from "react";

import classes from "./HamburgerItem.module.css";

const hamburgerItem = (props) => {
  return (
    <div
      className={[classes.HamburgerItem, "d-md-none"].join(" ")}
      onClick={props.clicked}
    >
      {props.content}
    </div>
  );
};

export default hamburgerItem;
