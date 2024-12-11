import * as actionTypes from '../action-types';

// Fetch contests
export const getContest = (payload) => ({
    type: actionTypes.GET_CONTEST,
    payload,
});

// Set contests in state
export const setContest = (payload) => ({
    type: actionTypes.SET_CONTEST,
    payload,
});

// Create a new contest
export const createContest = (payload) => ({
    type: actionTypes.CREATE_CONTEST,
    payload,
});

// Update an existing contest
export const updateContest = (payload) => ({
    type: actionTypes.UPDATE_CONTEST,
    payload,
});

// Delete a contest
export const deleteContest = (payload) => ({
    type: actionTypes.DELETE_CONTEST,
    payload,
});
