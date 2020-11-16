import React, { useState } from 'react'
import { IGridSong } from 'src/typings/ISong';
import { PaginatedResponse } from 'src/typings/PaginatedResponse';
import { addArtist } from 'src/utils/addFields';
import { getData } from 'src/utils/requests';
import { PaginatedList } from '../paginatedList';
import SongListView from "./SongListView"
import columns from "./utils/Columns";

const SongListContainer = (props?) => {

    const [rows, setRows] = useState<IGridSong[]>([]);

    const [rowCount, setRowCount] = useState<number>(0);

    const [loading, setLoading] = useState(false);
    const rowClick = (event) => {
        const isprop = props.add;
        if (isprop) {
            props.add(event.data);
        } else {
            console.log(props);
        }
    };

    const updateState = async (query: string) => {
        setLoading(true);
        const data: PaginatedResponse = await getData(query);
        setRows(addArtist(data.docs));
        setRowCount(data.totalDocs)
        setLoading(false);
    }

    return (
        <PaginatedList ListView={SongListView} loading={loading} rows={rows} rowCount={rowCount} columns={columns} updateState={updateState} rowClick={rowClick} >
        </PaginatedList>
    )
}

export default SongListContainer
