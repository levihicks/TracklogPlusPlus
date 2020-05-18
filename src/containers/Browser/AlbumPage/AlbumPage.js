import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import classes from "./AlbumPage.module.css";

import BackButton from "./BackButton/BackButton";
import Tracklist from "./Tracklist/Tracklist";
import lastFmAxios from "../../../axios/lastFm";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../../store/actions";
import { withAuthConsumer } from "../../../session";

import Add from "../../../assets/icons/add.svg";
import Remove from "../../../assets/icons/remove.svg";
import DefaultImg from "../../../assets/images/default_album_cover.png";

class AlbumPage extends Component {
  state = {
    albumInfo: null,
    inLog: false,
    showPopover: false,
  };

  fetchAlbumInfo = (newParams) => {
    lastFmAxios
      .get(
        "?method=album.getinfo&artist=" +
          encodeURIComponent(newParams.artist) +
          "&album=" +
          encodeURIComponent(newParams.title)
      )
      .then((response) => {
        this.setState({ albumInfo: response.data.album });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    const newParams = Object.fromEntries(
      new URLSearchParams(this.props.location.search)
    );
    if (this.state.albumInfo) {
      if (
        newParams.artist !== this.state.albumInfo.artist ||
        newParams.title !== this.state.albumInfo.name
      )
        this.fetchAlbumInfo(newParams);
    }
  }

  componentDidMount() {
    const newParams = Object.fromEntries(
      new URLSearchParams(this.props.location.search)
    );
    let albumInLog =
      this.props.albums.filter(
        (album) =>
          newParams.artist === album.artist && newParams.title === album.name
      ).length > 0;
    if (albumInLog) this.setState({ inLog: true });
    this.fetchAlbumInfo(newParams);
  }

  addRemoveHandler = () => {
    if (!this.props.loading) {
      if (!this.state.inLog) {
        const album = this.state.albumInfo;
        const albumData = {
          name: album.name,
          artist: album.artist,
          img: album.image[5]["#text"],
        };
        this.props.onAlbumAdd(albumData, this.props.authState.uid);
        this.setState({ inLog: true });
      } else {
        let album = this.state.albumInfo;
        let albumId = this.props.albums.filter(
          (a) => album.artist === a.artist && album.name === a.name
        )[0].albumId;
        this.props.onAlbumRemove(this.props.authState.uid, albumId);
        this.setState({ inLog: false });
      }
    }
  };

  render() {
    let albumPage = (
      <div className={classes.AlbumPageSpinner}>
        <Spinner />
      </div>
    );

    if (this.state.albumInfo) {
      const album = this.state.albumInfo;
      let albumImg = album.image[5]["#text"];
      if (!albumImg) albumImg = DefaultImg;
      albumPage = (
        <div className={classes.AlbumPage}>
          <BackButton />
          <div className={classes.AlbumInfo}>
            <div className={classes.AlbumImage}>
              <img alt="Album" src={albumImg} />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <div className={classes.AlbumTitle}>{album.name}</div>
              <div className={classes.AlbumArtist}>{album.artist}</div>
              <div
                className={
                  classes.AddRemoveButton +
                  " " +
                  (!this.props.authState && classes.Disabled)
                }
                onClick={this.props.authState && this.addRemoveHandler}
                onMouseEnter={() => {
                  this.setState({ showPopover: true });
                }}
                onMouseLeave={() => {
                  this.setState({ showPopover: false });
                }}
              >
                {!this.props.loading ? (
                  <img
                    alt=""
                    src={this.state.inLog ? Remove : Add}
                    className={classes.AddRemoveIcon}
                  />
                ) : (
                  <Spinner style={{ height: "80%", width: "80%" }} />
                )}
                {this.state.showPopover && !this.props.authState && (
                  <div className={classes.Popover}>
                    Create an account or sign in to add to your log!
                  </div>
                )}
              </div>
            </div>
          </div>
          <Tracklist tracks={album.tracks.track} />
        </div>
      );
    }
    return albumPage;
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.log.albums,
    loading: state.log.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAlbumAdd: (album, uid) => dispatch(actionCreators.addAlbum(album, uid)),
    onAlbumRemove: (uid, albumId) =>
      dispatch(actionCreators.removeAlbum(uid, albumId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compose(withAuthConsumer)(AlbumPage));
