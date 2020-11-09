import ISong from "./ISong";
import IUser from "./IUser";


export interface IGridQuiz {
    title: string;
    genre: string;
    id: string;
    songsLength: number;
    creator: string;
    createdAt: string;
    updatedAt: string;
}

export interface IQuiz {
    title: string;
    genre: string;
    songs: ISong[];
    songsLength: number;
    creator: IUser;
}