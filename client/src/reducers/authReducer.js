import { FETCH_ADMIN } from '../action/types';

const authReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_ADMIN:
            return action.payload || false;
        default:
            return state;
    }
};

export default authReducer;