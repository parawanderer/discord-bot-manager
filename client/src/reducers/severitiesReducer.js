import { FETCH_SEVERITIES, UPDATE_SEVERITY, DELETE_SEVERITY, ADD_SEVERITY } from '../action/types';

const severitiesReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_SEVERITIES:
            return action.payload || null;

        case UPDATE_SEVERITY:
            if (state === null) {
                return state;
            } 
            else 
            {
                const newState = [...state];
                let found = false;

                for (let i = 0; i < newState.length; i++ ) {
                    const item = newState[i];
                    if (item.id === action.payload.id) {
                        newState[i] = action.payload;
                        found = true;
                    }
                }

                if (found) return newState;
                // else add it because it didn't exist in the state yet for some reason
                newState.push(action.payload);
                return newState;
            }

        case DELETE_SEVERITY:
            if (state == null){
                return state;
            } else {
                const newState = [...state];

                for (let i = newState.length-1; i >= 0; i--) {
                    const item = newState[i];
                    if (item.id === action.payload.id) {
                        newState.splice(i,1);
                        break;
                    }
                }

                return newState;
            }

        case ADD_SEVERITY: 
            if (state == null) {
                return [action.payload];
            } else {
                const newState = [...state];
                newState.push(action.payload);
                return newState;
            }

        default:
            return state;
    }
};

export default severitiesReducer;