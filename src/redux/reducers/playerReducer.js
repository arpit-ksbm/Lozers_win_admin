import * as actionTypes from '../action-types';

const initialState = {
    playerData: [],
};

export const playerReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_PLAYER:
            return { ...state, playerData: payload };

        default:
            return state;
    }
};

export default playerReducer;