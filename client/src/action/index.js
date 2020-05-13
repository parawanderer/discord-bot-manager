import axios from 'axios';
import { 
    FETCH_GUILD_INFO, 
    FETCH_RECENT_PUNISHMENTS, 
    FETCH_ADMINS, 
    FETCH_MEMBER, 
    DELETE_ADMIN, 
    ADD_NEW_ADMIN, 
    FETCH_CONFIG_MAIN, 
    UPDATE_CONFIG_MAIN, 
    FETCH_SELF,
    FETCH_CONFIG_DATA,
    UPDATE_CONFIG_DATA,
    FETCH_RULES,
    UPDATE_RULES,
    FETCH_SEVERITIES,
    FETCH_SEVERITY,
    DELETE_SEVERITY,
    UPDATE_SEVERITY,
    ADD_SEVERITY,
    FETCH_FILTER_WORDS,
    FETCH_FILTER_LINKS,
    ADD_FILTERED_WORD,
    DELETE_FILTERED_WORD,
    UPDATE_FILTERED_WORD,
    ADD_WHITELISTED_LINK,
    DELETE_WHITELISTED_LINK,
    UPDATE_WHITELISTED_LINK,
    FETCH_IMMORTALS,
    DEACTIVATE_IMMORTAL,
    FETCH_IMMORTAL
} from './types';


export const fetchLoginStatus = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/self');
        dispatch({
            type: FETCH_SELF,
            payload: response.data
        });
    };

export const fetchGuildInfo = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/guild');
        dispatch({
            type: FETCH_GUILD_INFO,
            payload: response.data
        });
    };

export const fetchRecentPunishments = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/punish/history')
        dispatch({
            type: FETCH_RECENT_PUNISHMENTS,
            payload: response.data
        });
    };

export const fetchAdmins = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/admin');
        dispatch({
            type: FETCH_ADMINS,
            payload: response.data
        });
    }

// fetch admins and member details for each admin if possible
export const fetchAdminsDetailed = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/admin');

        if (response.data) {
            for (let i =0; i < response.data.length; i++) {
                const admin = response.data[i];
                const responseMember = await axios.get(`/api/members/${admin.userId}`);
                if (responseMember && responseMember.data && responseMember.data.id) {
                    admin.member = responseMember.data;
                }
            }
        }

        dispatch({
            type: FETCH_ADMINS,
            payload: response.data
        });
    }

export const fetchMember = (id) => 
    async (dispatch, getState) => {
        const response = await axios.get(`/api/members/${id}`);
        dispatch({
            type: FETCH_MEMBER,
            payload: response.data
        });
    };

export const deleteAdmin = (id) => 
    async (dispatch, getState) => {
        const response = await axios.delete(`/api/admin/${id}`);
        dispatch({
            type: DELETE_ADMIN,
            payload: response.data
        });
    };

export const addNewAdmin = (newAdminId, addedById, addedByName) => 
    async (dispatch, getState) => {
        const data = {
            userID: newAdminId,
            addedByID: addedById,
            addedByName: addedByName
        };
        const response = await axios.post('/api/admin', data);
        dispatch({
            type: ADD_NEW_ADMIN,
            payload: response.data
        });
    };

export const fetchBaseConfig = () =>
    async (dispatch, getState) => {
        const response = await axios.get('/api/config/main');
        dispatch({
            type: FETCH_CONFIG_MAIN,
            payload: response.data
        });
    };

export const updateBaseConfig = (newConfig) => 
    async(dispatch, getState) => {
        const response = await axios.put('/api/config/main', newConfig);
        dispatch({
            type: UPDATE_CONFIG_MAIN,
            payload: response.data
        });
    };

export const fetchDataConfig = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/config/data');
        dispatch({
            type: FETCH_CONFIG_DATA,
            payload: response.data
        });
    };

export const updateDataConfig = (newConfig) => 
    async(dispatch, getState) => {
        const response = await axios.put('/api/config/data', newConfig);
        dispatch({
            type: UPDATE_CONFIG_DATA,
            payload: response.data
        });
    };

export const fetchRules = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/rules');
        dispatch({
            type: FETCH_RULES,
            payload: response.data
        });
    };

export const updateRules = (newRules) => 
    async(dispatch, getState) => {
        const response = await axios.put('/api/rules', newRules);
        dispatch({
            type: UPDATE_RULES,
            payload: response.data
        });
    };

export const fetchSeverities = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/punish/types');
        dispatch({
            type: FETCH_SEVERITIES,
            payload: response.data
        });
    };

export const fetchSeverity = (id) => 
    async(dispatch, getState) => {
        const response = await axios.get(`/api/punish/types/${id}`);
        dispatch({
            type: FETCH_SEVERITY,
            payload: response.data
        });
    };

export const deleteSeverity = (id) => 
    async(dispatch, getState) => {
        const response = await axios.delete(`/api/punish/types/${id}`);
        dispatch({
            type: DELETE_SEVERITY,
            payload: response.data
        });
    };

export const updateSeverity = (id, newData) => 
    async(dispatch, getState) => {
        const response = await axios.put(`/api/punish/types/${id}`, newData);
        dispatch({
            type: UPDATE_SEVERITY,
            payload: response.data
        });
    };


export const addNewSeverity = (newData) => 
    async(dispatch, getState) => {
        const response = await axios.post(`/api/punish/types`, newData);
        dispatch({
            type: ADD_SEVERITY,
            payload: response.data
        });
    };


export const fetchFilteredWords = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/filter/words');
        dispatch({
            type: FETCH_FILTER_WORDS,
            payload: response.data
        });
    };

export const fetchWhitelistedLinks = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/filter/links');
        dispatch({
            type: FETCH_FILTER_LINKS,
            payload: response.data
        });
    };

export const addFilteredWord = (newWordData) => 
    async(dispatch, getState) => {
        const response = await axios.post('/api/filter/words', newWordData);
        dispatch({
            type: ADD_FILTERED_WORD,
            payload: response.data
        });
    };

export const removeFilteredWord = (id) => 
    async(dispatch, getState) => {
        const response = await axios.delete(`/api/filter/words/${id}`);
        dispatch({
            type: DELETE_FILTERED_WORD,
            payload: response.data
        });
    };

export const updateFilteredWord = (id, newData) => 
    async(dispatch, getState) => {
        const response = await axios.put(`/api/filter/words/${id}`, newData);
        dispatch({
            type: UPDATE_FILTERED_WORD,
            payload: response.data
        });
    };

export const addWhitelistedLink = (newLinkData) => 
    async(dispatch, getState) => {
        const response = await axios.post('/api/filter/links', newLinkData);
        dispatch({
            type: ADD_WHITELISTED_LINK,
            payload: response.data
        });
    };

export const removeWhitelistedLink = (id) => 
    async(dispatch, getState) => {
        const response = await axios.delete(`/api/filter/links/${id}`);
        dispatch({
            type: DELETE_WHITELISTED_LINK,
            payload: response.data
        });
    };

export const updateWhitelistedLink = (id, newData) => 
    async(dispatch, getState) => {
        const response = await axios.put(`/api/filter/links/${id}`, newData);
        dispatch({
            type: UPDATE_WHITELISTED_LINK,
            payload: response.data
        });
    };

export const fetchImmortals = () => 
    async(dispatch, getState) => {
        const response = await axios.get('/api/immortal');
        dispatch({
            type: FETCH_IMMORTALS,
            payload: response.data
        });
    };

export const fetchImmortal = (id) => 
    async(dispatch, getState) => {
        const response = await axios.get(`/api/immortal/${id}`);
        dispatch({
            type: FETCH_IMMORTAL,
            payload: response.data
        });
    };

export const deactivateImmortal = (id) =>
    async(dispatch, getState) => {
        const response = await axios.delete(`/api/immortal/${id}`);
        dispatch({
            type: DEACTIVATE_IMMORTAL,
            payload: response.data
        });
    };