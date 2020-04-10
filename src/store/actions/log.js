import * as actionTypes from './actionTypes';
import logsAxios from '../../axios/logs';

export const fetchLogFail = (err) => {
    return {
        type: actionTypes.FETCH_LOG_FAIL,
        error: err
    }
};

export const fetchLogSuccess = (albums) => {
    return {
        type: actionTypes.FETCH_LOG_SUCCESS,
        albums: albums
    }
};

export const fetchLogStart = () => {
    return {
        type: actionTypes.FETCH_LOG_START
    }
};

export const fetchLog = (uid, token) => {
    return (dispatch) => {
        dispatch(fetchLogStart());
        if(uid === null || token === null) {
            dispatch(fetchLogSuccess([]));
        }
        else {
            logsAxios.get("/logs/"+uid+".json?auth="+token)
            .then(res => {
                const fetchedAlbums = Object.keys(res.data)
                    .map(albumId => (
                    {...res.data[albumId], albumId: albumId}
                    ))
                    .filter(album => (
                        album.placeholder !== "placeholder"
                    ));
                dispatch(fetchLogSuccess(fetchedAlbums));
            })
            .catch(err=>{console.log(err);dispatch(fetchLogFail(err))});
        }
        
    };
    
};

export const addAlbumFail = (err) => {
    return {
        type: actionTypes.ADD_ALBUM_FAIL,
        error: err
    };
};

export const addAlbumSuccess = (album) => {
    console.log(album);
    return {
        type: actionTypes.ADD_ALBUM_SUCCESS,
        album: album
    };
};

export const addAlbumStart = () => {
    return {
        type: actionTypes.ADD_ALBUM_START
    };
};

export const addAlbum = (album, uid, token) => {
    return (dispatch) => {
        dispatch(addAlbumStart());
        logsAxios.post("/logs/"+uid+".json?auth="+token, album)
        .then(res => {
            // const albumWithId = {
            //     ...album,
            //     albumId: res.data.name
            // };
            // console.log(albumWithId);
            // dispatch(addAlbumSuccess(albumWithId));
            dispatch(fetchLog(uid, token));
        })
        .catch(err=>{dispatch(addAlbumFail(err))});
    }
}

export const removeAlbumFail = (err) => {
    return {
        type: actionTypes.REMOVE_ALBUM_FAIL,
        error: err
    };
};

export const removeAlbumSuccess = (album) => {
    console.log(album);
    return {
        type: actionTypes.REMOVE_ALBUM_SUCCESS,
        album: album
    };
};

export const removeAlbumStart = () => {
    return {
        type: actionTypes.REMOVE_ALBUM_START
    };
};

export const removeAlbum = (uid, token, albumId) => {
    return (dispatch) => {
        dispatch(removeAlbumStart());
        logsAxios.delete("/logs/"+uid+"/"+albumId+".json?auth="+token)
            .then(res => {
                dispatch(fetchLog(uid, token));
            })
            .catch(err => {dispatch(removeAlbumFail(err))});
    };
}