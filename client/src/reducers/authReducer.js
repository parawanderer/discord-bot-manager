import { FETCH_ADMIN } from '../action/types';


const isLoginDataChanged = (state, action) => {
    if (state === null) return true;

    // logged in status changed (not logged in to logged in or the other way around)
    if (state.loggedIn !== action.payload.loggedIn) return true;

    if (action.payload.loggedIn) {
        // user is now logged in
        // user was logged in before?
        if (state.user)
            if (state.user.adminUID !== action.payload.user.adminUID) return true; // user is now logged in as a different user
        
    } else {
        // user is now not logged in

    }

    return false; // ingore everything else?
};

const authReducer = (state = null, action) => {
    switch(action.type) {
        case FETCH_ADMIN:
            // if our login status updated, we will update this...
            if (isLoginDataChanged(state, action)) return action.payload || false;
            return state;

        default:
            return state;
    }
};

export default authReducer;