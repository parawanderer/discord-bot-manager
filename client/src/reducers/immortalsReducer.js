import {FETCH_IMMORTAL, FETCH_IMMORTALS, DEACTIVATE_IMMORTAL} from '../action/types';

const immortalsReducer = (state = null, action) => {
    switch(action.type) {

        case FETCH_IMMORTALS: 
            return action.payload || null;

        case FETCH_IMMORTAL:
            // TODO: 
            return state;
        
        case DEACTIVATE_IMMORTAL:
            // TODO: 
            return state;
        default:
        return state;
    }
};

export default immortalsReducer;