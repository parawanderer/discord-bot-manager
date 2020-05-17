import {FETCH_MEMBER, FETCH_MEMBER_FAILURE} from '../action/types';


const defaultState = {
    fetched_ids: [],
    member_history: {}
};

const HISTORY_LIMIT = 100;

const memberFetchHistoryReducer = (state = defaultState, action) => {
    switch(action.type) {

        case FETCH_MEMBER: 
            if (!action.payload) {
                return state;
            } else {
                if (state.fetched_ids.length === HISTORY_LIMIT) {
                    const id = state.fetched_ids.shift(); // remove oldest element from history array
                    delete state.member_history[id]; // delete corresponding member entry
                }
                const id = action.payload.id;
                const newState = {...state};

                if (newState.fetched_ids.indexOf(id) !== -1) {
                    // remove outdated item to replace with new item...
                    const index = newState.fetched_ids.indexOf(id);
                    newState.fetched_ids.splice(index, 1);
                }
                
                // add new fetched member to new state
                newState.fetched_ids.push(id);
                newState.member_history[id] = action.payload; 

                return newState;
            }

        case FETCH_MEMBER_FAILURE:

            if (!action.payload) {
                return state;
            } else {
                if (state.fetched_ids.length === HISTORY_LIMIT) {
                    const id = state.fetched_ids.shift(); // remove oldest element from history array
                    delete state.member_history[id]; // delete corresponding member entry
                }
                const id = action.payload;
                const newState = {...state};

                if (newState.fetched_ids.indexOf(id) !== -1) {
                    // remove outdated item to replace with new item...
                    const index = newState.fetched_ids.indexOf(id);
                    newState.fetched_ids.splice(index, 1);
                }

                // add new fetched member to new state
                newState.fetched_ids.push(id);
                newState.member_history[id] = null; // specific to failure to fetch user events 

                return newState;
            }

        default: 
            return state;
    }
};

export default memberFetchHistoryReducer;