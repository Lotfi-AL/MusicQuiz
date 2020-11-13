import React, { useEffect, useState } from "react";
import { getData } from "../../utils/requests";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { useRouter } from "next/router";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, Typography } from "@material-ui/core";
import styles from "./QuizListView.module.css";

let pageSize = 10;


const QuizListView = ({ updateState, page }) => {
    const router = useRouter();

    const [quantity, setQuantity] = useState([13, 17]);
    const [minQuantity, setMinQuantity] = useState<string>("3");

    const [maxQuantity, setMaxQuantity] = useState<string>("5");

    const [title, setTitle] = useState<string>("Top");

    const [genre, setGenre] = useState<string>("RnB");

    const [newSearch, setNewSearch] = useState(false)

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const baseQuery = "/quiz";

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
        console.log(search)
        search += "&page=" + page;
        return search
    }

    const searchQuery = async () => {
        let query: string = makeQuery()
        const data = await getData(query);
        updateState(data);
    };


    useEffect(() => {
        searchQuery()
    }, [page, quantity]);

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
                        step={0, 5}
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
                <FormControl component="fieldset">
                    <FormLabel component="legend">Genre</FormLabel>
                    <RadioGroup row aria-label="genre" name="genre" value={genre} onChange={(evt) => setGenre(evt.target.value)}>
                        <FormControlLabel value="Rock" control={<Radio />} label="Rock" />
                        <FormControlLabel value="Rap" control={<Radio />} label="Rap" />
                        <FormControlLabel value="RnB" control={<Radio />} label="RnB" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
    );
};

export default connect((state: ApplicationState) => state)(QuizListView);
