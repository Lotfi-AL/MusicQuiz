import { IQuiz } from "src/typings/IQuiz";

export interface QuizState {
    quiz: IQuiz;
    index: number;
}

export const SET_QUIZ = "SET_QUIZ";
export const SET_INDEX = "SET_INDEX";