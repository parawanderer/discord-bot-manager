import axios from 'axios';
import { FETCH_ADMIN, FETCH_GUILD_INFO, FETCH_RECENT_PUNISHMENTS, FETCH_ADMINS, FETCH_MEMBER, DELETE_ADMIN, ADD_NEW_ADMIN } from './types';


export const fetchLoginStatus = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/self');
        dispatch({
            type: FETCH_ADMIN,
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