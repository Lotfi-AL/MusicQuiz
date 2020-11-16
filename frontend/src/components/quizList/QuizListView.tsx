import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, Typography } from "@material-ui/core";
import styles from "./QuizListView.module.css";

import makeQuery from "src/utils/makeQuery";

import initGenresObject from "./utils/initGenresObject";

const QuizListView = ({ updateState, page, sortModel }) => {

    const [quantity, setQuantity] = useState([0, 10]);

    const [title, setTitle] = useState<string>("");

    const baseQuery = "/quiz";

    const [genres, setGenres] = useState(initGenresObject());


    const searchQuery = async () => {
        let query: string = makeQuery({ baseQuery, page, title, quantity, sortModel, genres })
        updateState(query);
    };

    const handleChecked = (event: { target: { name: string, checked: boolean } }) => {
        setGenres({ ...genres, [event.target.name]: event.target.checked })
    }

    useEffect(() => {
        console.log(page);
        searchQuery()
    }, [page, sortModel, genres, title, quantity]);


    return (
        <>
            <Grid item xs={8}>
                <TextField
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                    variant="outlined"
                    className={styles.maxWidth}
                    label="Search for title of quiz"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControl className={styles.maxWidth}>
                    <Typography id="range-slider" gutterBottom>
                        Quantity | Min-Max | songs
                    </Typography>
                    <Slider
                        value={quantity}
                        onChange={(event, newValue) => setQuantity(newValue)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        step={5}
                        max={50}
                        marks
                    />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Button onClick={() => searchQuery()} variant="contained" color="primary" className={styles.maxWidth}>
                    Search
                </Button>
            </Grid>
            <Grid item xs={12}>
                <FormLabel component="legend">Genres</FormLabel>
                <FormGroup row>
                    {Object.keys(genres).map((item, key) => {
                        return <FormControlLabel key={key}
                            control={<Checkbox checked={genres[item]}
                                onChange={handleChecked} name={item} />
                            }
                            label={item}
                        />
                    })}
                </FormGroup>
            </Grid>
        </>
    );
};

export default connect((state: ApplicationState) => state)(QuizListView);
