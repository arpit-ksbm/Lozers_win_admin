import * as actionTypes from '../action-types';

const initialState = {
    //* Fun Target Timer
    currentFTTGameIdData: null,
    currentFTTGameTotalBetsData: {},
    currentFTTGameTimerData: null,

    //* Fun Sorat Timer
    currentFSTGameIdData: null,
    currentFSTGameTotalBetsData: {},
    currentFSTGameTimerData: null,

    //* Prologic Timer
    currentPTGameIdData: null,
    currentPTGameTotalBetsData: {},
    currentPTGameTimerData: null,
};

const currentGameReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        //* Fun Target Timer
        case actionTypes?.SET_CURRENT_FTT_GAME_ID:
            return { ...state, currentFTTGameIdData: payload }

        case actionTypes?.SET_CURRENT_FTT_GAME_TOTAL_BETS:
            return { ...state, currentFTTGameTotalBetsData: payload }

        case actionTypes?.SET_CURRENT_FTT_GAME_TIMER:
            return { ...state, currentFTTGameTimerData: payload }

        //* Fun Sorat Timer
        case actionTypes?.SET_CURRENT_FST_GAME_ID:
            return { ...state, currentFSTGameIdData: payload }

        case actionTypes?.SET_CURRENT_FST_GAME_TOTAL_BETS:
            return { ...state, currentFSTGameTotalBetsData: payload }

        case actionTypes?.SET_CURRENT_FST_GAME_TIMER:
            return { ...state, currentFSTGameTimerData: payload }

        //* Prologic Timer
        case actionTypes?.SET_CURRENT_PT_GAME_ID:
            return { ...state, currentPTGameIdData: payload }

        case actionTypes?.SET_CURRENT_PT_GAME_TOTAL_BETS:
            return { ...state, currentPTGameTotalBetsData: payload }

        case actionTypes?.SET_CURRENT_PT_GAME_TIMER:
            return { ...state, currentPTGameTimerData: payload }

        default:
            return { ...state }
    }
}

export default currentGameReducer;