import { NavBar } from "../../components/navBar";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Container,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { postData } from "../../utils/requests";
import { SongListContainer } from "../../components/songList";
import styles from "./edit.module.css";
import { useRouter } from "next/router";

import { genres } from "../../utils/constants";

interface IQuiz {
    title: string;
    genre: string;
    songs: string[];
    creator: string;
}
interface ISong {
    title: string;
    genre: string;
    artist: string;
    _id: string;
}

const createQuiz = (store) => {
    const router = useRouter();
    const creator: string = store.authentication.currentUser;
    const [title, settitle] = useState("");
    const [genre, setgenre] = useState("");
    const [songs, setsongs] = useState<Array<string>>([]);
    const [songCards, setsongcards] = useState<Array<ISong>>([]);

    const handleQuizTitle = (event) => {
        settitle(event.target.value);
    };

    const handleGenre = (event) => {
        setgenre(event.target.value);
    };

    const addSongs = (event) => {
        const card: ISong = event;
        if (!songs.includes(event._id)) {
            setsongs([...songs, event._id]);
            setsongcards([...songCards, card]);
        } else {
            console.log("already in quiz");
        }
    };

    const handleDelete = (event) => {
        setsongcards(songCards.filter((el) => el._id !== event.currentTarget.id));
        setsongs(songs.filter((el) => el !== event.currentTarget.id));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data: IQuiz = { title, genre, songs, creator };

        try {
            postData("/quiz", data, true);
            router.push("/");
        } catch {
            console.log("err");
        }
    };

    return (
        <>
            <NavBar></NavBar>
            <br />
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardHeader data-test="create-quiz-title" title="Create new quiz" />
                            <CardContent>
                                Here you can create a new quiz. Fill in a quiz title and the desired genre.
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            data-test="quiz-title"
                            variant="outlined"
                            required
                            label="Quiz title"
                            value={title}
                            onChange={handleQuizTitle}
                            className={styles.maxWidth}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required variant="outlined" className={styles.maxWidth}>
                            <Select
                                data-test="quiz-genres"
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={genre}
                                required
                                onChange={handleGenre}>
                                <MenuItem value="" disabled>
                                    Genre
                                </MenuItem>
                                {genres.map((item, index) => {
                                    return (
                                        <MenuItem data-test={item} value={item} key={index} className={styles.capitalize}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>Genre</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <SongListContainer add={addSongs} />
                    </Grid>
                    <Grid item xs={12}>
                        <Card data-test="quiz-songs" variant="outlined">
                            {songCards.map((item) => {
                                return (
                                    <Card variant="outlined" key={item._id}>
                                        <Grid container direction="row">
                                            <CardContent className={styles.c}>
                                                <Typography variant="h5" component="h2">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2">{item.artist}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button data-test={"delete-" + item.title}
                                                    id={item._id}
                                                    onClick={(e) => handleDelete(e)}
                                                    className={styles.title}>
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Grid>
                                    </Card>
                                );
                            })}
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Button data-test="create-quiz" variant="contained" color="primary" onClick={handleSubmit} className={styles.maxWidth}>
                            Create Quiz
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default connect((state: ApplicationState) => state)(createQuiz);
