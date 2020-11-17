import { NavBar } from "../components/navBar";
import { connect } from "react-redux";
import { ApplicationState } from "../redux/store";
import { Container, Tabs, Tab, Card, CardHeader, CardContent, Grid, Paper, Button } from "@material-ui/core";
import { SongListContainer } from "../components/songList";
import { QuizListContainer } from "../components/quizList";
import React from "react";
import { TabPanel } from "../components/tabPanel";
import Link from "next/link";

const index = (store) => {
    const [value, setValue] = React.useState(0);
    const currentUser = store.authentication.currentUser;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <NavBar></NavBar>
            <Paper square>
                <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="primary">
                    <Tab data-cy="quizTab" label="Quiz List"></Tab>
                    <Tab data-cy="songTab" label="Song List"></Tab>
                </Tabs>
            </Paper>

            <Container maxWidth="md">
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardHeader title="Music Quiz"></CardHeader>
                                <CardContent>
                                    This a music quiz service. Click on any quiz below and be referred to a page with
                                    its content. Thereafter you can play each song in your music service of choice, and
                                    keep track with the website. To start using the service please sign up and create a
                                    new quiz at the bottom of the page.
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <QuizListContainer />
                        </Grid>
                        <Grid item xs={12}>
                            {currentUser != null ? (
                                <Link href="/quiz/edit">
                                    <Button variant="contained" color="primary">
                                        Create Quiz
                                    </Button>
                                </Link>
                            ) : (
                                    <></>
                                )}
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardHeader title="Music Overview"></CardHeader>
                                <CardContent>
                                    Here you can check out the availabe songs that can be used in your quizzes.
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <SongListContainer />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Container>
        </>
    );
};

export default connect((state: ApplicationState) => state)(index);
