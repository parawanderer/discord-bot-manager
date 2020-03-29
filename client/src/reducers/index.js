import { combineReducers } from 'redux';

import authReducer from './authReducer';
import guildReducer from "./guildReducer";
import recentPunishmentsReducer from './recentPunishmentsReducer';
import adminsReducer from './adminsReducer';
import configReducer from './configReducer';

export default combineReducers({
    auth: authReducer,
    guild: guildReducer,
    recent_punishments: recentPunishmentsReducer,
    admins: adminsReducer,
    config: configReducer
});