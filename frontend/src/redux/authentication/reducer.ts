import jwt from "jsonwebtoken";
import { HYDRATE } from "next-redux-wrapper";
import { Reducer } from "redux";

import {
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_OUT_FAILURE,
    SIGN_OUT_REQUEST,
    SIGN_OUT_SUCCESS,
    AuthenticationState,
} from "./types";

export const isValidToken = (token) => {
    let decoded: any = jwt.decode(token);
    return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

const createInitState = () => {
    try {
        return {
            token: localStorage.getItem("USER-TOKEN") ? localStorage.getItem("USER-TOKEN") : null,
            currentUser: localStorage.getItem("USER-TOKEN") ? isValidToken(localStorage.getItem("USER-TOKEN")) : null,
            error: "",
            loading: false,
            isAuthenticated: false,
        };
    } catch (err) {
        return {
            currentUser: null,
            token: null,
            error: "",
            loading: false,
            isAuthenticated: false,
        };
    }
};

const authenticationReducer: Reducer<AuthenticationState> = (state = createInitState(), action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case SIGN_IN_FAILURE:
        case SIGN_UP_FAILURE:
        case SIGN_OUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                currentUser: null,
                isAuthenticated: false,
            };
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                currentUser: localStorage.getItem("USER-TOKEN")
                    ? isValidToken(localStorage.getItem("USER-TOKEN"))
                    : null,
                isAuthenticated: true,
            };
        case SIGN_OUT_SUCCESS:
            localStorage.removeItem("USER-TOKEN");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                currentUser: null,
                token: null,
            };
        default:
            return { ...state };
    }
};

export default authenticationReducer;
