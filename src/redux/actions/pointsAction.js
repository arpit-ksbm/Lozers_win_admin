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

// Create a new contest
// export const createContest = (payload) => ({
//     type: actionTypes.CREATE_CONTEST,
//     payload,
// });

// // Update an existing contest
// export const updateContest = (payload) => ({
//     type: actionTypes.UPDATE_CONTEST,
//     payload,
// });

// // Delete a contest
// export const deleteContest = (payload) => ({
//     type: actionTypes.DELETE_CONTEST,
//     payload,
// });
