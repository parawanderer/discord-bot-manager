import { Cookies } from 'react-cookie';

import { FETCH_PUNISHMENTS, FETCH_SEARCH_PUNISHMENTS, SET_PUNISHMENTS_PAGE, SET_PUNISHMENTS_PER_PAGE} from '../action/types';

export const COOKIE_OPTIONS = { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 };
export const COOKIE_PER_PAGE_NAME = 'per_page';
export const DEFAULT_PER_PAGE = 30;

const cookies = new Cookies();

let per_page;

// initialise per_page from cookies if it was set
if (cookies.get(COOKIE_PER_PAGE_NAME)) {
    per_page = cookies.get(COOKIE_PER_PAGE_NAME);
    per_page = parseInt(per_page);
    if (isNaN(per_page) || per_page <= 10 || per_page > 500) per_page = DEFAULT_PER_PAGE;
} else {
    per_page = DEFAULT_PER_PAGE;
}

const defaultState = {
    per_page,
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