import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    categories: [],
    error: false,
    loading: false
};

const addCategoryStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const addCategorySuccess = (state, action) => {
    return updateObject(state, {categories: state.categories.concat(action.categoryInfo), loading: false});
}

const addCategoryFail = (state, action) => {
    return updateObject(state, {error: true, loading: false});
}
    
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_CATEGORY_START:
            return addCategoryStart(state, action);
        case actionTypes.ADD_CATEGORY_SUCCESS:
            return addCategorySuccess(state, action);
        case actionTypes.ADD_CATEGORY_FAIL:
            return addCategoryFail(state, action);
        default:
            return state;
    }
}

export default reducer;