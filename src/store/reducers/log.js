import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    albums: [],
    loading: false
};

const fetchLogStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchLogSuccess = (state, action) => {
    return updateObject(state, {loading: false, albums: action.albums});
};

const fetchLogFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const addAlbumStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const addAlbumSuccess = (state, action) => {
    return updateObject(state, {albums: state.albums.concat(action.album)});
};

const addAlbumFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
};

const removeAlbumStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const removeAlbumSuccess = (state, action) => {
    return updateObject(state, {});
};

const removeAlbumFail = (state, action) => {
    return updateObject(state, {error: action.error});
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_LOG_START:
            return fetchLogStart(state, action);
        case actionTypes.FETCH_LOG_SUCCESS:
            return fetchLogSuccess(state, action);
        case actionTypes.FETCH_LOG_FAIL:
            return fetchLogFail(state, action);
        case actionTypes.ADD_ALBUM_START:
            return addAlbumStart(state, action);
        case actionTypes.ADD_ALBUM_SUCCESS:
            return addAlbumSuccess(state, action);
        case actionTypes.ADD_ALBUM_FAIL:
            return addAlbumFail(state, action);
        case actionTypes.REMOVE_ALBUM_START:
            return removeAlbumStart(state, action);
        case actionTypes.REMOVE_ALBUM_SUCCESS:
            return removeAlbumSuccess(state, action);
        case actionTypes.REMOVE_ALBUM_FAIL:
            return removeAlbumFail(state, action);
        default:
            return state;
    }
};

export default reducer;
