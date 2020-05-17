import {FETCH_RECENT_PUNISHMENTS, FETCH_PUNISHMENTS, FETCH_SEARCH_PUNISHMENTS, SET_PUNISHMENTS_PAGE, SET_PUNISHMENTS_PER_PAGE} from '../action/types';

const defaultState = {
    per_page: 30,
    page:1,
    data: null
};


const punishmentsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case FETCH_PUNISHMENTS: case FETCH_SEARCH_PUNISHMENTS: 
            //return action.payload || null;
            return action.payload ? {...state, data: action.payload} : state;
        case SET_PUNISHMENTS_PAGE:
            if (!action.payload && action.payload !== 0) return state;
            return {...state, page: action.payload};
        case SET_PUNISHMENTS_PER_PAGE:
            if (!action.payload && action.payload !== 0) return state;
            return {...state, page: 1, per_page: action.payload};
        default:
            return state;
    }
};

export default punishmentsReducer;