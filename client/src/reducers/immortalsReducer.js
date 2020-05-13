import {FETCH_IMMORTAL, FETCH_IMMORTALS, DEACTIVATE_IMMORTAL, FETCH_MINECRAFT_PLAYER, FETCH_MEMBER} from '../action/types';
import InputValidator from '../utils/InputValidator';

const immortalsReducer = (state = null, action) => {
    switch(action.type) {

        case FETCH_IMMORTALS: 
            return action.payload || null;

        case FETCH_IMMORTAL:
            // TODO: 
            return state;
        
        case DEACTIVATE_IMMORTAL:
            if (state === null) {
                return state;
            } else {
                const newState = [...state];
                let found = false;
                for (let i = 0; i < newState.length; i++) {
                    const immortal = newState[i];
                    if (immortal.discord_id === action.payload.id) {
                        immortal.active = false;
                        found = true;
                        break;
                    }
                }
                return found ? newState : state;
            }
        case FETCH_MINECRAFT_PLAYER:
            if (state === null) {
                return state;
            } else {
                const newState = [...state];
                let found = false;
                for (let i = 0; i < newState.length; i++) {
                    const immortal = newState[i];
                    if (InputValidator.stripDashesFromUUID(immortal.minecraft_uuid) === action.payload.id) {
                        immortal['minecraft_info'] = action.payload;
                        found = true;
                        break;
                    }
                }
                return found ? newState : state;
            }
        case FETCH_MEMBER:
            if (state === null) {
                return state;
            } else {
                const newState = [...state];
                let found = false;
                for (let i = 0; i < newState.length; i++) {
                    const immortal = newState[i];
                    if (immortal.discord_id === action.payload.id) {
                        immortal['member'] = action.payload;
                        found = true;
                        break;
                    }
                }
                return found ? newState : state;
            }
        default:
        return state;
    }
};

export default immortalsReducer;