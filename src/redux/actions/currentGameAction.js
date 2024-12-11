import * as actionTypes from '../action-types';

//* Fun Target Timer
export const getCurrentFTTGameId = payload => ({
    type: actionTypes?.GET_CURRENT_FTT_GAME_ID, payload
});

export const setCurrentFTTGameId = payload => ({
    type: actionTypes?.SET_CURRENT_FTT_GAME_ID, payload
});

export const getCurrentFTTGameTotalBets = payload => ({
    type: actionTypes?.GET_CURRENT_FTT_GAME_TOTAL_BETS, payload
});

export const setCurrentFTTGameTotalBets = payload => ({
    type: actionTypes?.SET_CURRENT_FTT_GAME_TOTAL_BETS, payload
});

export const getCurrentFTTGameTimer = payload => ({
    type: actionTypes?.GET_CURRENT_FTT_GAME_TIMER, payload
});

export const setCurrentFTTGameTimer = payload => ({
    type: actionTypes?.SET_CURRENT_FTT_GAME_TIMER, payload
});

export const currentFTTGameWinnerByAdmin = payload => ({
    type: actionTypes?.CURRENT_FTT_GAME_WINNER_BY_ADMIN, payload
});

//* Fun Sorat Timer
export const getCurrentFSTGameId = payload => ({
    type: actionTypes?.GET_CURRENT_FST_GAME_ID, payload
});

export const setCurrentFSTGameId = payload => ({
    type: actionTypes?.SET_CURRENT_FST_GAME_ID, payload
});

export const getCurrentFSTGameTotalBets = payload => ({
    type: actionTypes?.GET_CURRENT_FST_GAME_TOTAL_BETS, payload
});

export const setCurrentFSTGameTotalBets = payload => ({
    type: actionTypes?.SET_CURRENT_FST_GAME_TOTAL_BETS, payload
});

export const getCurrentFSTGameTimer = payload => ({
    type: actionTypes?.GET_CURRENT_FST_GAME_TIMER, payload
});

export const setCurrentFSTGameTimer = payload => ({
    type: actionTypes?.SET_CURRENT_FST_GAME_TIMER, payload
});

export const currentFSTGameWinnerByAdmin = payload => ({
    type: actionTypes?.CURRENT_FST_GAME_WINNER_BY_ADMIN, payload
});

//* Prologic Timer
export const getCurrentPTGameId = payload => ({
    type: actionTypes?.GET_CURRENT_PT_GAME_ID, payload
});

export const setCurrentPTGameId = payload => ({
    type: actionTypes?.SET_CURRENT_PT_GAME_ID, payload
});

export const getCurrentPTGameTotalBets = payload => ({
    type: actionTypes?.GET_CURRENT_PT_GAME_TOTAL_BETS, payload
});

export const setCurrentPTGameTotalBets = payload => ({
    type: actionTypes?.SET_CURRENT_PT_GAME_TOTAL_BETS, payload
});

export const getCurrentPTGameTimer = payload => ({
    type: actionTypes?.GET_CURRENT_PT_GAME_TIMER, payload
});

export const setCurrentPTGameTimer = payload => ({
    type: actionTypes?.SET_CURRENT_PT_GAME_TIMER, payload
});

export const currentPTGameWinnerByAdmin = payload => ({
    type: actionTypes?.CURRENT_PT_GAME_WINNER_BY_ADMIN, payload
});