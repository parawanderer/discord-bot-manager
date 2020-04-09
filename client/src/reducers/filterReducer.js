import { FETCH_FILTER_WORDS, FETCH_FILTER_LINKS } from '../action/types';

const filterReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_FILTER_WORDS:
            if (state === null) {
                const newState = {};
                newState.words = action.payload || null;
                return newState;
            } else {
                return {...state, words :action.payload || null};
            }
        
        case FETCH_FILTER_LINKS:
            if (state === null) {
                const newState = {};
                newState.links = action.payload || null;
                return newState;
            } else {
                return {...state, links :action.payload || null};
            }

        default:
            return state;
    }
};

export default filterReducer;