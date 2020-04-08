import { FETCH_RULES, UPDATE_RULES } from '../action/types';

const rulesReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_RULES:
            return action.payload || null;

        case UPDATE_RULES:
            return action.payload || null;

        default:
            return state;
    }
};

export default rulesReducer;