import { NextRouter } from "next/router";
import { getData } from "../../utils/requests";
import { SET_INDEX, SET_QUIZ } from "./types";



export const setQuiz = (payload, router: NextRouter) => {
    return (dispatch) => {
        console.log(payload);
        return getData("/quiz/" + payload).then((res) => {
            const quiz = res;
            console.log("Ja")
            console.log(quiz);
            dispatch({ type: SET_QUIZ, payload: quiz });
        })
    }
};

export const setIndex = (payload, router: NextRouter) => {
    return (dispatch) => {
        dispatch({ type: SET_INDEX, payload: payload });
    };
};



