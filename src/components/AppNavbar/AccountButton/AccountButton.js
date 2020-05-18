import React from "react";

import classes from "./AccountButton.module.css";

const accountButton = (props) => {
  return (
    <button onClick={props.clicked} className={classes.AccountButton}>
      login / signup
    </button>
  );
};

export default accountButton;
