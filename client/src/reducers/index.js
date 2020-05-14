import { combineReducers } from 'redux';

import authReducer from './authReducer';
import guildReducer from "./guildReducer";
import recentPunishmentsReducer from './recentPunishmentsReducer';
import adminsReducer from './adminsReducer';
import configReducer from './configReducer';
import rulesReducer from './rulesReducer';
import severitiesReducer from './severitiesReducer';
import filterReducer from './filterReducer';
import immortalsReducer from './immortalsReducer';
import mcStatusReducer from './mcStatusReducer';

export default combineReducers({
    auth: authReducer,
    guild: guildReducer,
    recent_punishments: recentPunishmentsReducer,
    admins: adminsReducer,
    config: configReducer,
    rules: rulesReducer,
    severities: severitiesReducer,
    filter : filterReducer,
    immortal: immortalsReducer,
    mc_status : mcStatusReducer
});