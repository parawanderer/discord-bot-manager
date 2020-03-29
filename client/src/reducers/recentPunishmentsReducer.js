import {FETCH_RECENT_PUNISHMENTS} from '../action/types';

const recentPunishmentsReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_RECENT_PUNISHMENTS: 
            return action.payload || null;
        default:
            return state;
    }
};

export default recentPunishmentsReducer;