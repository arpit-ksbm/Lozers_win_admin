import * as actionTypes from '../action-types';

export const getFTTGameHistory = payload => ({
    type: actionTypes?.GET_FTT_GAME_HISTORY, payload
});

export const setFTTGameHistory = payload => ({
    type: actionTypes?.SET_FTT_GAME_HISTORY, payload
});

export const getFSTGameHistory = payload => ({
    type: actionTypes?.GET_FST_GAME_HISTORY, payload
});

export const setFSTGameHistory = payload => ({
    type: actionTypes?.SET_FST_GAME_HISTORY, payload
});

export const getPTGameHistory = payload => ({
    type: actionTypes?.GET_PT_GAME_HISTORY, payload
});

export const setPTGameHistory = payload => ({
    type: actionTypes?.SET_PT_GAME_HISTORY, payload
});