import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { Container, Typography, Grid, List, ListItemText, Card, CardHeader, CardContent, Button, Link } from "@material-ui/core";
import { useRouter } from "next/router";
import { getData } from "../../utils/requests";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar";
import React from "react";
import ISong from "../../typings/ISong";
import { IQuiz } from "../../typings/IQuiz";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../../redux/quiz/actions";

const Quiz = (store) => {
    const router = useRouter();
    const { pid } = router.query;
    const dispatch = useDispatch();
    // const [quiz, setQuiz] = useState<IQuiz>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch(setQuiz(pid, router));
        // getData("/quiz/" + pid, false)
        //     .then((data) => {
        //         setQuiz(data);
        //         // dispatch(setQuiz(pid,router))
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

    }, []);

    const { quiz } = store.quiz;
    console.log(store);
    return (
        <>
            <NavBar></NavBar>
            <br />
            <Container maxWidth="md">
                <div>{store.error != undefined ? store.error : null}</div>
                {quiz ? (
                    <>
                        <Grid container spacing={2}>
                            <Grid container xs={12} direction="row" justify="center" data-test="quiz-details">
                                <Grid item xs={6}>
                                    <Card variant="outlined">
                                        <CardHeader title={quiz.title}></CardHeader>
                                        <CardContent>
                                            <Typography variant="body1">Made by {quiz.creator.username}</Typography>
                                            <Typography variant="body1">Genre: {quiz.genre}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Link href={"/quiz/game/" + pid}>
                                                <Button variant="contained" color="primary">
                                                    Play this Quiz
                                                    </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} data-test="quiz-songs">
                                <Card variant="outlined">
                                    <CardHeader title="Songs: "></CardHeader>
                                    <CardContent>
                                        <List>
                                            {quiz.songs.map((item, index) => {
                                                return (
                                                    <ListItemText
                                                        primary={item.title}
                                                        key={index}
                                                        secondary={item.artist.map((item, index, array) => {
                                                            return index + 1 === array.length
                                                                ? item.name
                                                                : item.name + ", ";
                                                        })}></ListItemText>
                                                );
                                            })}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                ) : null}
            </Container>
        </>
    );
};


// export const getServerSideProps = async (context) => {
//     console.log(context);
//     return { props: {} };
// };


export default connect((state: ApplicationState) => state)(Quiz);
