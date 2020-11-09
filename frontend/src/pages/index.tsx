import { NavBar } from "../components/navBar";
import { connect } from "react-redux";
import { ApplicationState } from "../redux/store";
import { Container, Tabs, Tab, Card, CardHeader, CardContent, Grid, Paper } from "@material-ui/core";
import { SongList } from "../components/songList";
import { QuizList } from "../components/quizList";
import React from "react";
import { TabPanel } from "../components/TabPanel";
import { CreateQuizBtn } from "../components/createQuizBtn";

const index = (store) => {
    const [value, setValue] = React.useState(0);
    const currentUser = store.authentication.currentUser;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(store);
    return (
        <>
            <NavBar></NavBar>
            <Paper square>
                <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="primary">
                    <Tab label="Quiz List"></Tab>
                    <Tab label="Song List"></Tab>
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
                            <QuizList />
                        </Grid>
                        <Grid item xs={12}>
                            {currentUser != null ? <CreateQuizBtn /> : <></>}
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
                            <SongList />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Container>
        </>
    );
};

export default connect((state: ApplicationState) => state)(index);
