import * as actionTypes from '../action-types';

export const getPlayer = payload => ({
    type: actionTypes.GET_PLAYER, payload,
});

export const setPlayer = payload => ({
    type: actionTypes.SET_PLAYER, payload,
});

export const createPlayer = payload => ({
    type: actionTypes.CREATE_PLAYER, payload,
});

export const updatePlayer = payload => ({
    type: actionTypes.UPDATE_PLAYER, payload,
});

export const deletePlayer = payload => ({
    type: actionTypes.DELETE_PLAYER, payload,
});

export const updatePlayerWallet = payload => ({
    type: actionTypes.UPDATE_PLAYER_WALLET, payload,
});

export const changePlayerStatus = payload => ({
    type: actionTypes.CHANGE_PLAYER_STATUS, payload,
});