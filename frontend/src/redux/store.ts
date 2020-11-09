import { applyMiddleware, createStore, compose, Store, Action, Reducer } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import authenticationReducer from "./authentication/reducer";
import { AuthenticationState } from "./authentication/types";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";

export interface ApplicationState {
    authentication: AuthenticationState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
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

const wrapper = createWrapper<ApplicationState>(makeStore);

export default wrapper;
