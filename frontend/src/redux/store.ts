import { applyMiddleware, createStore, compose, Store, Action, Reducer } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import authenticationReducer from "./authentication/reducer";
import { AuthenticationState } from "./authentication/types";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import quizReducer from "./quiz/reducer";
import { QuizState } from "./quiz/types";
import { useMemo } from "react";
import { composeWithDevTools } from 'redux-devtools-extension'

export interface ApplicationState {
    authentication: AuthenticationState;
    quiz: QuizState;
}

let store;

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    quiz: quizReducer
});

const makeStore: MakeStore<ApplicationState> = (context: Context) => {
    let composeEnhancers = compose;
    const middlewares = [thunk];
    const store = createStore<ApplicationState, Action<any>, unknown, unknown>(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
};

const initialState: ApplicationState = {
    authentication: {
        currentUser: null,
        token: null,
        error: "",
        loading: false,
        isAuthenticated: false,
    },
    quiz: { quiz: null, index: 0 }
}

function initStore(preloadedState = initialState) {
    return createStore(
        rootReducer,
        preloadedState,
        compose(applyMiddleware())
    )
}


export const initializeStore = (preloadedState?) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
// const wrapper = createWrapper<ApplicationState>(makeStore);

// export default wrapper;
