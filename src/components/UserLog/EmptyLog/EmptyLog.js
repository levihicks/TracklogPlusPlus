import React from "react";

import classes from "./EmptyLog.module.css";

import EmptyLogBackground from "../../../assets/images/empty_log_tiles.svg";

const Fade = () => <div className={classes.Fade}></div>;

const EmptyLogMsg = () => (
  <div className={classes.EmptyLogMsg}>
    No albums yet!
    <br />
    Add the ones you want to check out here.
  </div>
);

const emptyLog = () => {
  return (
    <div className={classes.EmptyLog}>
      <img
        src={EmptyLogBackground}
        alt=""
        className={classes.EmptyLogBackground}
      />
      <Fade />
      <EmptyLogMsg />
    </div>
  );
};

export default emptyLog;
