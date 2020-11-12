import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { IGridQuiz } from 'src/typings/IQuiz';
import { IGridSong } from 'src/typings/ISong';
import addIdAndArtist, { addCreator } from 'src/utils/addFields';
import { PaginatedList } from '../PaginatedList';
import SongListView from "./SongListView"


const SongListContainer = (props?) => {
    const baseQuery = "/song";

    const [rows, setRows] = useState<IGridSong[]>([]);

    const [rowCount, setRowCount] = useState<number>(0);

    const router = useRouter();

    const columns = [
        {
            field: "id",
            hide: true,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
        },
        { field: "bpm", headerName: "BPM", width: 120 },
        { field: "artist", headerName: "Artist", width: 240 },
        { field: "genre", headerName: "Genre", width: 120 },
        { field: "duration", headerName: "Duration", width: 120 },
    ];

    const rowClick = (event) => {
        const isprop = props.add;
        if (isprop) {
            props.add(event.data);
        } else {
            console.log(props);
        }
    };

    const updateState = (data) => {
        setRows(addIdAndArtist(data.docs));
        setRowCount(data.totalDocs)
    }

    console.log("quizlistContainer");
    return (
        <PaginatedList ListView={SongListView} baseQuery={baseQuery} rows={rows} rowCount={rowCount} columns={columns} updateState={updateState} rowClick={rowClick} >
        </PaginatedList>
    )
}

export default SongListContainer
