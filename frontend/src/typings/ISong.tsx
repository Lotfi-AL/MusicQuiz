export default interface ISong {
    title: string;
    bpm: Number;
    artist: IArtist[];
    genre: string;
    duration: Number;
}


interface IArtist {
    name: string;
}

export interface IGridSong {
    title: string;
    bpm: Number;
    artist: string;
    id: string;
    duration: Number;
    createdAt: string;
    updatedAt: string;
}