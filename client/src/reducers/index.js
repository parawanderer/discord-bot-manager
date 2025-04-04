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
import punishmentsReducer from './punishmentsReducer';
import memberFetchHistoryReducer from './memberFetchHistoryReducer';
import punishmentReducer from './punishmentReducer';

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
    mc_status : mcStatusReducer,
    punishments: punishmentsReducer,
    member_fetch_history: memberFetchHistoryReducer,
    punishment_detail: punishmentReducer
});