import { Button, FormControl, Grid, Slider, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getData } from 'src/utils/requests';
import { setSourceMapRange } from 'typescript';
import styles from "./SongListView.module.css";


let pageSize = 10;

const SongListView = ({ updateState, page, sortModel }) => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");

    const [duration, setDuration] = useState([90, 180])

    const baseQuery = "/song";

    const makeQuery = () => {
        let search: string = baseQuery + "?";
        if (pageSize !== 0) {
            search += "&limit=" + pageSize
        }
        if (title !== "") {
            search += "&title=" + title
        }
        //implementation for duration
        // if (duration !== null) {
        //     search += "&duration[gte]=" + duration[0].toString() + "&duration[lte]=" + duration[1].toString()
        // }
        if (sortModel.sortDirection !== "") {
            search += "&sort_by=" + sortModel.field + "&order_by=" + sortModel.sortDirection
        }
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
    }, [page, title, sortModel]);


    return (
        <>
            <Grid item xs={8}>
                <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    variant="outlined"
                    label="Search for a song"
                    className={styles.maxWidth}
                />
            </Grid>
            <Grid item xs={4}>
                <FormControl className={styles.maxWidth}>
                    <Typography id="range-slider" gutterBottom>
                        Duration | Min-Max
                    </Typography>
                    <Slider
                        value={duration}
                        onChange={(event, newValue) => setDuration(newValue)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        step={30}
                        min={90}
                        max={480}
                        marks
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => searchQuery()} variant="contained" color="primary" className={styles.maxWidth}>
                    Search
                </Button>
            </Grid>
        </>
    )
}

export default SongListView
