import { FETCH_CONFIG_MAIN, UPDATE_CONFIG_MAIN, FETCH_CONFIG_DATA, UPDATE_CONFIG_DATA, FETCH_MEMBER } from "../action/types";

const configReducer = (state = null, action) => {
    switch (action.type) {

        case FETCH_CONFIG_MAIN:

            return state ? {...state, main: action.payload} : { main : action.payload};

        case UPDATE_CONFIG_MAIN: 

            return state ? {...state, main: action.payload} : { main : action.payload };

        case FETCH_CONFIG_DATA:

            var reportBlacklist = {};
            action.payload.reportSystem.reportBlacklist.forEach(userID => {
                reportBlacklist[userID] = { id: userID, member: null };
            });

            return state 
                ? {...state, data: action.payload, reportBlacklist} 
                : { data : action.payload, reportBlacklist};

        case UPDATE_CONFIG_DATA:
            
            var reportBlacklist = {};
            action.payload.reportSystem.reportBlacklist.forEach(userID => {
                reportBlacklist[userID] = { id: userID, member: null };
            });
            
            return state 
                ? {...state, data: action.payload, reportBlacklist} 
                : { data : action.payload, reportBlacklist};

        case FETCH_MEMBER: 

            // Allow us to update blacklisted member "member" object if we ever fetch such a member
            if (state && state.reportBlacklist && state.reportBlacklist[action.payload.id]) {
                // if a key with the user ID exists, we will set the member variable of this to the fetched member
                const alteredState = {...state};
                alteredState.reportBlacklist[action.payload.id].member = action.payload;
                return alteredState;
            }
            return state;

        default:
            return state;
    }
};

export default configReducer;