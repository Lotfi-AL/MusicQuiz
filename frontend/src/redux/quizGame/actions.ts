import { postData } from "../../utils/requests";
import { NextRouter } from "next/router";

import {
    SET_QUIZ,
    SET_PAGE,
} from "./types";

export const setQuiz = (payload, router) => {
    return (dispatch) => {
        dispatch({ type: "SET_QUIZ", payload: payload })
    }
}
export const setPage = (payload, router) => {
    return (dispatch) => {
        dispatch({ type: "SET_PAGE", payload: payload })
    }
}
