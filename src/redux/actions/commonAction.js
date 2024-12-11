import * as actionTypes from "../action-types";

export const setIsLoading = (payload) => ({
    type: actionTypes.SET_IS_LOADING, payload,
});

export const setIsSidebarOpne = (payload) => ({
    type: actionTypes.SET_IS_SIDEBAR_OPEN, payload,
});