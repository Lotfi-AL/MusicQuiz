export interface AuthenticationState {
    currentUser: string;
    token: string;
    error: string;
    loading: boolean;
    isAuthenticated: boolean;
}

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

interface SignInRequest {
    type: typeof SIGN_IN_REQUEST;
}

interface SignInSuccess {
    type: typeof SIGN_IN_SUCCESS;
    payload: {
        token: string;
    };
}

interface SignInFailure {
    type: typeof SIGN_IN_FAILURE;
    payload: {
        error: string;
    };
}

export type SignInTypes = SignInRequest | SignInSuccess | SignInFailure;

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

interface SignUpRequest {
    type: typeof SIGN_UP_REQUEST;
}

interface SignUpSuccess {
    type: typeof SIGN_UP_SUCCESS;
    payload: {
        token: string;
    };
}

interface SignUpFailure {
    type: typeof SIGN_UP_FAILURE;
    payload: {
        error: string;
    };
}

export type SignUpTypes = SignUpRequest | SignUpSuccess | SignUpFailure;

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

interface SignOutRequest {
    type: typeof SIGN_OUT_REQUEST;
}

interface SignOutSuccess {
    type: typeof SIGN_OUT_SUCCESS;
}

interface SignOutFailure {
    type: typeof SIGN_OUT_FAILURE;
}

export type SignOutTypes = SignOutRequest | SignOutSuccess | SignOutFailure;
