import React from "react";
import { Link } from "react-router-dom";

import classes from "./Album.module.css";

import DefaultImg from "../../assets/images/default_album_cover.png";

const album = (props) => (
  <div className={classes.Album}>
    <div className={classes.AlbumCover}>
      <img src={props.img ? props.img : DefaultImg} alt="Album Cover" />
    </div>
    <Link
      className={classes.AlbumTitle}
      to={{
        pathname: "/albumInfo",
        search:
          "?artist=" +
          encodeURIComponent(props.artist) +
          "&title=" +
          encodeURIComponent(props.title),
      }}
    >
      {props.title}
    </Link>
    <div className={classes.AlbumArtist}>{props.artist}</div>
  </div>
);

export default album;
