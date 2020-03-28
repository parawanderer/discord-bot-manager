import axios from 'axios';
import { FETCH_ADMIN } from './types';


export const fetchLoginStatus = () => 
    async (dispatch, getState) => {
        const response = await axios.get('/api/self');
        dispatch({
            type: FETCH_ADMIN,
            payload: response.data
        });
    };