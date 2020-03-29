import { FETCH_GUILD_INFO } from '../action/types';

const guildReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_GUILD_INFO:
            return action.payload || null;
        default:
            return state;
    }
};

export default guildReducer;