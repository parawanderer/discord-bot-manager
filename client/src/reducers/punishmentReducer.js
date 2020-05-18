import { FETCH_PUNISHMENT, WIPE_PUNISHMENT } from '../action/types';

const punishmentReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_PUNISHMENT:
            return action.payload || null;
        case WIPE_PUNISHMENT:
            if (state === null) {
                return action.payload || null;
            } else {
                if (state.id !== action.payload.id.toString()) return state;
                return action.payload || null;
            }
        default:
            return state;
    }
};

export default punishmentReducer;