import * as actions from '../actions';

const initialState = {
    categories: [

    ]
};

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actions.ADD_POPULAR_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.category)
            }
        default:
            return state
    }
}

export default reducer;