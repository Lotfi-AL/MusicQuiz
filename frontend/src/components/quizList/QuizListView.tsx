import React, { useEffect, useState } from "react";
import { getData } from "../../utils/requests";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { useRouter } from "next/router";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, Typography } from "@material-ui/core";
import styles from "./QuizListView.module.css";

import { genres as initGenres } from "../../utils/constants"

let pageSize = 10;


const QuizListView = ({ updateState, page }) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState([0, 10]);

    const [title, setTitle] = useState<string>("");

    const baseQuery = "/quiz";

    const [genres, setGenres] = useState(() => {
        const newObj = {}
        for (let genre of initGenres) {
            newObj[genre] = false
        }
        return newObj;
    })

    const gen2 = ["pop", "rock", "electronic"]

    const makeQuery = () => {
        let search: string = baseQuery + "?";
        if (pageSize !== 0) {
            search += "&limit=" + pageSize
        }
        if (title !== "") {
            search += "&title=" + title
        }
        if (quantity !== null) {
            search += "&quantity[gte]=" + quantity[0].toString() + "&quantity[lte]=" + quantity[1].toString();
        }
        for (const [key, value] of Object.entries(genres)) {
            if (value) {
                search += "&genre[]=" + key
            }
        }
        search += "&page=" + page;
        return search
    }

    const searchQuery = async () => {
        let query: string = makeQuery()
        const data = await getData(query);
        updateState(data);
    };

    const handleChecked = (event) => {
        setGenres({ ...genres, [event.target.name]: event.target.checked })
    }

    useEffect(() => {
        searchQuery()
    }, [page, quantity, genres, title]);

    return (
        <>
            <Grid item xs={8}>
                <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    variant="outlined"
                    className={styles.maxWidth}
                    label="Search for title of quiz"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControl className={styles.maxWidth}>
                    <Typography id="range-slider" gutterBottom>
                        Quantity | Min-Max
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
