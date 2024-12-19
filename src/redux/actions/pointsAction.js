import * as actionTypes from '../action-types';

// Fetch contests
export const getPoints = (payload) => ({
    type: actionTypes.GET_POINTS,
    payload,
});

// Set contests in state
export const setPoints = (payload) => ({
    type: actionTypes.SET_POINTS,
    payload,
});


// Update an existing contest
export const updatePoints = (payload) => ({
    type: actionTypes.UPDATE_POINTS,
    payload,
});

