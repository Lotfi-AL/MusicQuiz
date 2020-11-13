import React from 'react'
import { CreateQuiz } from '../CreateQuiz'
import QuizList from '../../components/quizList/QuizListView'
import Link from "next/link";
import { Button, Container } from '@material-ui/core';
import { SongList } from '../../components/songList';
import { CreateQuizBtn } from '../../components/createQuizBtn';
import { getData } from '../../utils/requests';


const MainPage = () => {
    const apiCall = async () => {
        getData("/api/songs", false)
    }

    const apiCallArtists = () => {
        const response = getData("/api/artists", false);
        // console.log(response);
        // const json = await response.json();
        // console.log(json);
    }

    return (
        <Container maxWidth="md">
            <QuizList />
            <SongList />
            <CreateQuizBtn />
            <Button onClick={apiCall} >get songs </Button>
            <Button onClick={apiCallArtists}>Get artists</Button>
        </Container>
    )
}

export default MainPage