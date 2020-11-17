import { IGridQuiz, IQuiz } from "../typings/IQuiz";
import ISong, { IGridSong } from "../typings/ISong";

//This file is needed for creator and username to be presented correctly in the UI

export const addCreator = (quizzes: IQuiz[]) => {
    const returnData = new Array<IGridQuiz>();
    if (quizzes) {
        for (let item of quizzes) {
            returnData.push(addCreatorToQuiz(item))
        }
    }
    return returnData;
}

export const addArtist = (songs: ISong[]) => {
    const returnData = new Array<IGridSong>();
    if (songs) {
        for (let item of songs) {
            returnData.push(addArtistToItem(item))
        }
    }
    return returnData;
}

const addArtistToItem = (song: ISong) => {
    let newItem: IGridSong = { ...song, artist: song.artist[0].name };
    return newItem;
}
const addCreatorToQuiz = (quiz: IQuiz) => {
    let newItem: IGridQuiz = { ...quiz, creator: quiz.creator.username };
    return newItem;
}

export function union(setA: IQuiz | ISong | any, setB: IQuiz | ISong | any) {
    let _union = new Set<IQuiz | ISong | any>(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}