import * as actionTypes from "../action-types";

const initialState = {
    isLoading: false,
    isSidebarOpen: true
};

const commonReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: payload,
            };
        }
        case actionTypes.SET_IS_SIDEBAR_OPEN: {
            return {
                ...state,
                isSidebarOpen: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default commonReducer;