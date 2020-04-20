import * as actionTypes from './actionTypes';
import { userLog, logAlbum } from '../../firebase';

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

export const fetchLog = (uid) => {
    return (dispatch) => {
        console.log('yo');
        dispatch(fetchLogStart());
        if(uid === null) {
            dispatch(fetchLogSuccess([]));
        }
        else {
            userLog(uid)
            .on('value', snapshot => {
                const logObj = snapshot.val();
                console.log(logObj);
                let fetchedAlbums;
                if(logObj){
                    fetchedAlbums = Object.keys(logObj)
                        .map(albumId => (
                        {...logObj[albumId], albumId: albumId}
                        ))
                        .filter(album => (
                            !album.placeholder
                        ));
                    console.log(fetchedAlbums);
                }
                else    
                    fetchedAlbums = [];
                dispatch(fetchLogSuccess(fetchedAlbums));
            });
            
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

export const addAlbum = (album, uid) => {
    return (dispatch) => {
        console.log(album);
        let test=album;
        dispatch(addAlbumStart());
        userLog(uid)
        .push(test)
        .catch(err=>{dispatch(addAlbumFail(err))});
        dispatch(fetchLog(uid));
    }
};

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

export const removeAlbum = (uid, albumId) => {
    return (dispatch) => {
        dispatch(removeAlbumStart());
        logAlbum(uid, albumId).remove()
            .catch(err => {dispatch(removeAlbumFail(err))});
        dispatch(fetchLog(uid));
    };
}