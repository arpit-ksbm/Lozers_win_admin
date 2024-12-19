import * as actionTypes from '../action-types';

const initialState = {
    pointsData: [],
};

export const pointsReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_POINTS:
            return { ...state, pointsData: payload };

        default:
            return state;
    }
};

export default pointsReducer;