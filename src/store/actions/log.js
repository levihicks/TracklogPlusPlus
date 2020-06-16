import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchLogFail = (err) => {
  return {
    type: actionTypes.FETCH_LOG_FAIL,
    error: err,
  };
};

export const fetchLogSuccess = (albums) => {
  return {
    type: actionTypes.FETCH_LOG_SUCCESS,
    albums: albums,
  };
};

export const fetchLogStart = () => {
  return {
    type: actionTypes.FETCH_LOG_START,
  };
};

export const fetchLog = (uid) => {
  return (dispatch) => {
    dispatch(fetchLogStart());
    if (uid === null) {
      dispatch(fetchLogSuccess([]));
    } else {
      let fetchedAlbums;
      axios
        .get(`http://localhost:5000/users/${uid}/log`)
        .then((res) => {
          if (res.data.length > 0) {
            fetchedAlbums = res.data.map((a) => {
              return {
                name: a.name,
                artist: a.artist,
                img: a.img,
                albumId: a._id,
              };
            });
          } else fetchedAlbums = [];
          dispatch(fetchLogSuccess(fetchedAlbums));
        })
        .catch((err) => dispatch(fetchLogFail(err)));
    }
  };
};

export const addAlbumFail = (err) => {
  return {
    type: actionTypes.ADD_ALBUM_FAIL,
    error: err,
  };
};

export const addAlbumSuccess = (album) => {
  return {
    type: actionTypes.ADD_ALBUM_SUCCESS,
    album: album,
  };
};

export const addAlbumStart = () => {
  return {
    type: actionTypes.ADD_ALBUM_START,
  };
};

export const addAlbum = (album, uid) => {
  return (dispatch) => {
    dispatch(addAlbumStart());
    axios
      .post(`http://localhost:5000/users/${uid}/log`, { album })
      .then(() => {
        dispatch(fetchLog(uid));
      })
      .catch((err) => {
        dispatch(addAlbumFail(err));
      });
  };
};

export const removeAlbumFail = (err) => {
  return {
    type: actionTypes.REMOVE_ALBUM_FAIL,
    error: err,
  };
};

export const removeAlbumSuccess = (album) => {
  return {
    type: actionTypes.REMOVE_ALBUM_SUCCESS,
    album: album,
  };
};

export const removeAlbumStart = () => {
  return {
    type: actionTypes.REMOVE_ALBUM_START,
  };
};

export const removeAlbum = (uid, albumId) => {
  return (dispatch) => {
    dispatch(removeAlbumStart());
    axios
      .delete(`http://localhost:5000/users/${uid}/log/${albumId}`)
      .then(() => {
        dispatch(fetchLog(uid));
      })
      .catch((err) => {
        dispatch(removeAlbumFail(err));
      });
  };
};
