import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { Container, Typography, Grid, List, ListItemText, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getData } from "../../utils/requests";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/navBar";
import React from "react";
import ISong from "../../typings/ISong";
import Link from "next/link";
import { IQuiz } from "../../typings/IQuiz";

const Quiz = (store) => {
    const router = useRouter();
    const { pid } = router.query;
    console.log(store);
    const [quiz, setQuiz] = useState<IQuiz>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData("/quiz/" + pid, false)
            .then((data) => {
                setQuiz(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [loading]);

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
                                <Grid item xs={6}>
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

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.params;

    const data = await getData("/quiz/" + pid).then((data) => {
        return data;
    }); 
        .catch((error) => {
            console.log(error);
            return { error: true };
        });

    return { props: { data } };
};
*/

export default connect((state: ApplicationState) => state)(Quiz);
