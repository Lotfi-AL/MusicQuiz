import { IQuiz } from "../typings/IQuiz";
import ISong from "../typings/ISong";

const addArtistToItem = (item) => {
    let newItem = { ...item };
    newItem.artist = item.artist[0].name;
    return newItem;
}

export const addCreator = (data) => {
    const returnData = new Array();
    if (data) {
        for (let item of data) {
            returnData.push(addCreatorToItem(item))
        }
    }
    else {
    }
    return returnData;
}

const addIdToItem = (item) => {
    let newItem = { ...item, id: item._id }
    return newItem;
}

export const addCreatorToItem = (item) => {
    let newItem = { ...item };
    newItem.creator = item.creator.username;
    return newItem;
}

const addIdAndArtist = (data) => {
    const returnData = new Array();
    for (let item of data) {
        returnData.push(addArtistToItem(addIdToItem(item)));
    }
    return returnData;
}

export const addId = (data) => {
    const returnData = new Array();
    for (let item of data) {
        returnData.push(addIdToItem(item));
    }
    return returnData;
}

export const addIdAndCreator = (data) => {
    const returnData = new Array();
    for (let item of data) {
        returnData.push(addIdToItem(addCreatorToItem(item)));
    }
    return returnData;
}

export default addIdAndArtist;

export function union(setA, setB) {
    let _union = new Set<IQuiz | ISong | any>(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}