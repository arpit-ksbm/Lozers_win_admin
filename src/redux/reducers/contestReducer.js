import * as actionTypes from '../action-types';

const initialState = {
    contestData: [],
};

export const contestReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_CONTEST:
            return { ...state, contestData: payload };

        default:
            return state;
    }
};

export default contestReducer;