import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addCategoryInfo = (res, categoryName) => {
    return {
        type: actionTypes.ADD_POPULAR_CATEGORY,
        albums: res.data.albums.album,
        name: categoryName
    }
}

export const addPopularCategory = category => {
    return (dispatch) => {
        axios.get("?method=tag.gettopalbums&tag="+category+"&limit=5")
                .then(response => {dispatch(addCategoryInfo(response, category))})
                .catch(error => {console.log(error)});
    }
}