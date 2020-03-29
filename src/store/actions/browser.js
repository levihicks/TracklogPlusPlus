import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addCategoryStart = () => {
    return {
        type: actionTypes.ADD_CATEGORY_START
    };
}

export const addCategorySuccess = (res, category) => {
    const categoryInfo = {name: category, albums: []};
    categoryInfo.albums = res.data.albums.album.map(album => (
        {name: album.name, artist: album.artist.name, img: album.image[3]["#text"]}
    ));
    return {
        type: actionTypes.ADD_CATEGORY_SUCCESS,
        categoryInfo: categoryInfo
    }
}

export const addCategoryFail = (err) => {
    return {
        type: actionTypes.ADD_CATEGORY_FAIL,
        error: err
    }
}

export const addCategory = category => {
    return (dispatch) => {
        axios.get("?method=tag.gettopalbums&tag="+category+"&limit=5")
            .then(response => {dispatch(addCategorySuccess(response, category))})
            .catch(error => {dispatch(addCategoryFail(error));});
    }
}