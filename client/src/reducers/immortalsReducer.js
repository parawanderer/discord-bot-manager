import {FETCH_IMMORTAL, FETCH_IMMORTALS, DEACTIVATE_IMMORTAL, FETCH_MINECRAFT_PLAYER, FETCH_MEMBER} from '../action/types';
import InputValidator from '../utils/InputValidator';


const getImmortalByDiscordID = (id,state) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].discord_id === id) return state[i];
    }   
    return null;
};


const immortalsReducer = (state = null, action) => {
    switch(action.type) {

        case FETCH_IMMORTALS: 
            if (state === null) {
                return action.payload || null;
            } else {
                if (!action.payload) {
                    return action.payload || null;
                }
                
                // we will copy over the discord member info & minecraft info from the old objects to limit requests

                const newState = action.payload;

                for (let i = 0; i < state.length; i++) {
                    const oldImmortal = state[i];
                    const newImmortal = getImmortalByDiscordID(oldImmortal.discord_id, newState);
                    if (newImmortal) {
                        if (oldImmortal.minecraft_info) {
                            newImmortal.minecraft_info = oldImmortal.minecraft_info;
                        }
                        if (oldImmortal.member) {
                            newImmortal.member = oldImmortal.member;
                        }
                    }
                }

                return newState;
            }

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