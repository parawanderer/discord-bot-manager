import { FETCH_MINECRAFT_STATUS } from '../action/types';

const mcStatusReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_MINECRAFT_STATUS:
            return action.payload || null;
        default:
            return state;
    }
};

export default mcStatusReducer;