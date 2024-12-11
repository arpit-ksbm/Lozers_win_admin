import * as actionTypes from '../action-types';

// Fetch users
export const getUsers = (payload) => ({
    type: actionTypes.GET_USERS,
    payload,
});

// Set contests in state
export const setUsers = (payload) => ({
    type: actionTypes.SET_USERS,
    payload,
});

// Update user status
export const updateUserStatus = (payload) => ({
    type: actionTypes.UPDATE_USER_STATUS,
    payload,
});

