import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    categories: []
};

const createCategory = (state, action) => {
    const categoryInfo = {name: action.name, albums: []};
    categoryInfo.albums = action.albums.map(album => (
        {name: album.name, artist: album.artist.name, img: album.image[3]["#text"]}
    ));
    return updateObject(state, {categories: state.categories.concat(categoryInfo)});
}
    
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_POPULAR_CATEGORY:
            return createCategory(state, action);
        default:
            return state;
    }
}

export default reducer;