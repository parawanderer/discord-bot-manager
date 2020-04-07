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
    UPDATE_CONFIG_DATA
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
        const response = await axios.get('api/guild');
        dispatch({
            type: FETCH_GUILD_INFO,
            payload: response.data
        });
    };

export const fetchRecentPunishments = () => 
    async (dispatch, getState) => {
        const response = await axios.get('api/punish/history')
        dispatch({
            type: FETCH_RECENT_PUNISHMENTS,
            payload: response.data
        });
    };

export const fetchAdmins = () => 
    async (dispatch, getState) => {
        const response = await axios.get('api/admin');
        dispatch({
            type: FETCH_ADMINS,
            payload: response.data
        });
    }

// fetch admins and member details for each admin if possible
export const fetchAdminsDetailed = () => 
    async (dispatch, getState) => {
        const response = await axios.get('api/admin');

        if (response.data) {
            for (let i =0; i < response.data.length; i++) {
                const admin = response.data[i];
                const responseMember = await axios.get(`api/members/${admin.userId}`);
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
        const response = await axios.get(`api/members/${id}`);
        dispatch({
            type: FETCH_MEMBER,
            payload: response.data
        });
    };

export const deleteAdmin = (id) => 
    async (dispatch, getState) => {
        const response = await axios.delete(`api/admin/${id}`);
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
        const response = await axios.post('api/admin', data);
        dispatch({
            type: ADD_NEW_ADMIN,
            payload: response.data
        });
    };

export const fetchBaseConfig = () =>
    async (dispatch, getState) => {
        const response = await axios.get('api/config/main');
        dispatch({
            type: FETCH_CONFIG_MAIN,
            payload: response.data
        });
    };

export const updateBaseConfig = (newConfig) => 
    async(dispatch, getState) => {
        const response = await axios.put('api/config/main', newConfig);
        dispatch({
            type: UPDATE_CONFIG_MAIN,
            payload: response.data
        });
    };

export const fetchDataConfig = () => 
    async(dispatch, getState) => {
        const response = await axios.get('api/config/data');
        dispatch({
            type: FETCH_CONFIG_DATA,
            payload: response.data
        });
    };

export const updateDataConfig = (newConfig) => 
    async(dispatch, getState) => {
        const response = await axios.put('api/config/data', newConfig);
        dispatch({
            type: UPDATE_CONFIG_DATA,
            payload: response.data
        });
    };

