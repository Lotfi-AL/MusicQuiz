import { connect } from "react-redux";
import { ApplicationState } from "../../../redux/store";
import { Container, Typography, Grid, List, ListItemText, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getData } from "../../../utils/requests";
import { useEffect, useState } from "react";
import { NavBar } from "../../../components/navBar"
import React from "react";
import Link from "next/link";
import { IQuiz } from "../../../typings/IQuiz";
import { GameContainer } from "../../../components/game";
import { useDispatch, useSelector } from "react-redux";
import ScoreBoard from "../../../components/game/ScoreBoard";

const Game = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [page, setPage] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);
    console.log(page)
    return (
        <>
            <NavBar></NavBar>
            <br />
            <Container maxWidth="md">
                {/* <ScoreBoard done={done} /> */}
                <GameContainer pid={pid} page={page} />
                <Button variant={"contained"} onClick={() => setPage(page + 1)}>Next Song in Quiz</Button>
            </Container>
        </>
    );
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid} = context.params;

    const data = await getData("/quiz/" + pid).then((data) => {
        return data;
    });
        .catch((error) => {
                console.log(error);
            return { error: true };
        });

    return { props: { data} };
};
*/

export default connect((state: ApplicationState) => state)(Game);
