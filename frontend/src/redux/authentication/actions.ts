import { postData } from "../../utils/requests";
import { NextRouter } from "next/router";

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
    SignInTypes,
    SignUpTypes,
    SignOutTypes,
} from "./types";

const signInRequest = (): SignInTypes => {
    return {
        type: SIGN_IN_REQUEST,
    };
};

const signInSuccess = (token): SignInTypes => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: {
            token,
        },
    };
};

const signInFailure = (error): SignInTypes => {
    return {
        type: SIGN_IN_FAILURE,
        payload: error,
    };
};

export const signIn = (payload, router: NextRouter) => {
    return (dispatch) => {
        dispatch(signInRequest);
        postData("/signIn", payload)
            .then((res) => {
                const { token } = res;
                localStorage.setItem("USER-TOKEN", token);
                dispatch(signInSuccess(token));
                router.push("/");
            })
            .catch((error) => {
                dispatch(signInFailure(error));
            });
    };
};

const signUpRequest = (): SignUpTypes => {
    return {
        type: SIGN_UP_REQUEST,
    };
};

const signUpSuccess = (token): SignUpTypes => {
    return {
        type: SIGN_UP_SUCCESS,
        payload: {
            token,
        },
    };
};

const signUpFailure = (error): SignUpTypes => {
    return {
        type: SIGN_UP_FAILURE,
        payload: error,
    };
};

export const signUp = (user, router: NextRouter) => {
    return (dispatch) => {
        dispatch(signUpRequest());
        postData("/signUp", user)
            .then((res) => {
                const { token } = res;
                dispatch(signUpSuccess(token));
                router.push("/");
            })
            .catch((error) => {
                dispatch(signUpFailure(error));
            });
    };
};

export const signOutRequest = (): SignOutTypes => {
    return {
        type: SIGN_OUT_REQUEST,
    };
};

export const signOutSuccess = (): SignOutTypes => {
    return {
        type: SIGN_OUT_SUCCESS,
    };
};

export const signOutFailure = (): SignOutTypes => {
    return {
        type: SIGN_OUT_FAILURE,
    };
};

export const signOut = (router: NextRouter) => {
    return (dispatch) => {
        dispatch(signOutRequest());
        localStorage.clear();
        router.push("/");
        if (localStorage.getItem("USER_TOKEN")) {
            dispatch(signOutFailure());
        } else {
            dispatch(signOutSuccess());
        }
    };
};
