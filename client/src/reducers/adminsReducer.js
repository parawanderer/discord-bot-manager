import {FETCH_ADMINS, FETCH_MEMBER, DELETE_ADMIN, ADD_NEW_ADMIN, FETCH_ADMINS_DETAIL} from '../action/types';


const adminsReducer = (state = null, action) => {
    switch(action.type) {

        case FETCH_ADMINS: 
            return action.payload || null;

        case FETCH_MEMBER:
            if (state === null) return state;
            for (let i =0; i < state.length; i++) {
                if (state[i].userId === action.payload.id) {
                    const copy = [...state];
                    copy[i] = {...state[i], member: action.payload};
                    return copy;
                }
            }
            return state;
        
        case FETCH_ADMINS_DETAIL:
            return action.payload || null;

        case DELETE_ADMIN:

            if (state === null) return state;
            for (let i =0; i < state.length; i++) {
                if (state[i].userId === action.payload.userId) {
                    const copy = [...state];
                    copy.splice(i, 1);
                    return copy;
                }
            }
            return state;
        
        case ADD_NEW_ADMIN:
            
            if (state === null) return state;
            const copy = [...state];
            copy.push(action.payload);
            return copy;

        default:
        return state;
    }
};

export default adminsReducer;