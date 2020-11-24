import { IQuiz } from "../../typings/IQuiz";

export interface QuizGameState {
    currentPage: number;
    currentQuiz: string;
}

export const SET_QUIZ = "SET_QUIZ";
export const SET_PAGE = "SET_PAGE";
