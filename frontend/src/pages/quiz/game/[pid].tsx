import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { Container, Typography, Grid, List, ListItemText, Card, CardHeader, CardContent } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getData } from "src/utils/requests";
import { useEffect, useState } from "react";
import { NavBar } from "src/components/navBar"
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import ISong from "src/typings/ISong";
import GameContainer from "../../../components/game/GameContainer";
import { setQuiz } from "../../../redux/quiz/actions";
import { initializeStore } from "../../../redux/store";


const QuizGame = (store) => {
    console.log(store);
    const songs = useSelector((state) => state);
    // const index = useSelector((state) => state.quiz.index)
    console.log(songs);


    return (
        <>
            <NavBar></NavBar>
            <GameContainer song={null} />
        </>
    );
};


export function getServerSideProps() {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    dispatch({
        type: "SET_INDEX",
        index: 2
    })

    return { props: { initialReduxState: reduxStore.getState() } }
}