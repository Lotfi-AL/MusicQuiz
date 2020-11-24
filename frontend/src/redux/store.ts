import { applyMiddleware, createStore, compose, Store, Action, Reducer } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import authenticationReducer from "./authentication/reducer";
import { AuthenticationState } from "./authentication/types";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import quizGameReducer from "./quizGame/reducer";
import { QuizGameState } from "./quizGame/types";

export interface ApplicationState {
    authentication: AuthenticationState;
    quizGame: QuizGameState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authentication: authenticationReducer,
    quizGame: quizGameReducer
});

const makeStore: MakeStore<ApplicationState> = (context: Context) => {
    let composeEnhancers = compose;
    const middlewares = [thunk];

    const store = createStore<ApplicationState, Action<any>, unknown, unknown>(
        rootReducer,
        applyMiddleware(thunk),
        // composeEnhancers(applyMiddleware(...middlewares)),
    );

    return store;
};

const wrapper = createWrapper<ApplicationState>(makeStore);

export default wrapper;
