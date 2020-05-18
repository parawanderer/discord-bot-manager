import { FETCH_PUNISHMENT, WIPE_PUNISHMENT } from '../action/types';

const punishmentReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_PUNISHMENT:
            return action.payload || null;
        default:
            return state;
    }
};

export default punishmentReducer;