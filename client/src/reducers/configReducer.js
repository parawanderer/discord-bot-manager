import { FETCH_CONFIG_MAIN, UPDATE_CONFIG_MAIN } from "../action/types";

const configReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_CONFIG_MAIN:
            const newState = {};
            newState.main = action.payload;
            return newState;

        case UPDATE_CONFIG_MAIN: 
            if (state === null) {
                const newState = {};
                newState.main = action.payload;
                return newState;
            }
            const modifiedState = {...state};
            modifiedState.main = action.payload;
            return modifiedState;

        default:
            return state;
    }
};

export default configReducer;