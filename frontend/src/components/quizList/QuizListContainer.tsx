import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { IGridQuiz } from 'src/typings/IQuiz';
import { PaginatedResponse } from 'src/typings/PaginatedResponse';
import { addCreator } from 'src/utils/addFields';
import { getData } from 'src/utils/requests';
import { PaginatedList } from '../paginatedList';
import QuizListView from './QuizListView';
import columns from "./utils/Columns";
const QuizList = () => {
    const [rows, setRows] = useState<IGridQuiz[]>([]);

    const [rowCount, setRowCount] = useState<number>(0);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const rowClick = (event: { data: { id: string; }; }) => {
        router.push("/quiz/" + event.data.id);
    };

    /*
    * Updates the rows from the API query response and the number of rows
    */
    const updateState = async (query: string) => {
        setLoading(true)
        const data: PaginatedResponse = await getData(query);
        setRows(addCreator(data.docs));
        setRowCount(data.totalDocs)
        setLoading(false)
    }

    return (
        <PaginatedList loading={loading} ListView={QuizListView} rows={rows} rowCount={rowCount} columns={columns} updateState={updateState} rowClick={rowClick} />
    )
}

export default QuizList
