import * as actionTypes from '../action-types';

const initialState = {
    fttGameHistoryData: [],
    fstGameHistoryData: [],
    ptGameHistoryData: []
};

const gameHistoryReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_FTT_GAME_HISTORY:
            return { ...state, fttGameHistoryData: payload };

        case actionTypes.SET_FST_GAME_HISTORY:
            return { ...state, fstGameHistoryData: payload };

        case actionTypes.SET_PT_GAME_HISTORY:
            return { ...state, ptGameHistoryData: payload };

        default:
            return state;
    }
};

export default gameHistoryReducer;