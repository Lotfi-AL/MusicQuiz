import jwt from "jsonwebtoken";
import { HYDRATE } from "next-redux-wrapper";
import { Reducer } from "redux";

import {
    QuizGameState,
} from "./types";

const createInitState = () => {
    try {
        return {
            currentQuiz: null,
            currentPage: 0
        };
    } catch (err) {
        return {
            currentQuiz: null,
            currentPage: 0
        };
    }
};

const quizGameReducer: Reducer<QuizGameState> = (state = createInitState(), action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        case "SET_PAGE":
            return {
                ...state,
                currentPage: action.payload
            };
        case "SET_QUIZ":
            return {
                ...state,
                currentQuiz: action.payload
            }
        default:
            return { ...state };
    }
};

export default quizGameReducer;
