import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { IGridQuiz } from 'src/typings/IQuiz';
import { addCreator } from 'src/utils/addFields';
import { PaginatedList } from '../PaginatedList';
import QuizListView from './QuizListView';
import TopWrapper from './TopWrapper';

const QuizList = () => {
    const baseQuery = "/quiz";

    const [rows, setRows] = useState<IGridQuiz[]>([]);

    const [rowCount, setRowCount] = useState<number>(0);

    const router = useRouter();

    const columns = [
        { field: "title", headerName: "Name", width: 150 },
        { field: "genre", headerName: "Genre", width: 150 },
        { field: "songsLength", headerName: "Songs", width: 130 },
        { field: "creator", headerName: "Created By", width: 150 },
        { field: "createdAt", headerName: "Created At", width: 150 },
    ];

    const rowClick = (event) => {
        router.push("/quiz/" + event.data.id);
    };

    const updateState = (data) => {
        setRows(addCreator(data.docs));
        setRowCount(data.totalDocs)
    }

    console.log("quizlistContainer");
    return (
        <PaginatedList ListView={QuizListView} baseQuery={baseQuery} rows={rows} rowCount={rowCount} columns={columns} updateState={updateState} rowClick={rowClick} >
        </PaginatedList>
    )
}

export default QuizList
