import jwt from "jsonwebtoken";
import { HYDRATE } from "next-redux-wrapper";
import { Reducer } from "redux";

import {
    QuizState,
    SET_QUIZ,
    SET_INDEX
} from "./types";


const createInitState = () => {
    try {
        return {
            quiz: null,
            index: 0
        };
    } catch (err) {
        return {
            quiz: null,
            index: 0
        };
    }
};

const quizReducer: Reducer<QuizState> = (state = createInitState(), action) => {
    switch (action.type) {
        // case HYDRATE:
        //     const nextState = {
        //         ...state,
        //         ...action.paylod,
        //     }
        //     console.log(state);
        //     return nextState;
        case "SET_QUIZ":
            return {
                ...state,
                quiz: action.payload,
                index: 0
            };
        case "SET_INDEX":
            return {
                ...state,
                index: action.payload
            };
        default:
            return state;
    }
};

export default quizReducer;
