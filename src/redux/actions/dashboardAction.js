import * as actionTypes from '../action-types';

// Fetch users
export const getDashboard = (payload) => ({
    type: actionTypes.GET_DASHBOARD,
    payload,
});

// Set contests in state
export const setDashboard = (payload) => ({
    type: actionTypes.SET_DASHBOARD,
    payload,
});

