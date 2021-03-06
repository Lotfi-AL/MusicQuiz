import { Button, FormControl, Grid, Slider, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import makeQuery from '../../utils/makeQuery';
import { ISortModel } from '../../typings/ISortModel';
import styles from "./SongListView.module.css";

const SongListView = ({ updateState, page, sortModel }: { updateState: (query: string) => Promise<void>, page: string, sortModel: ISortModel }) => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");

    const [duration, setDuration] = useState<number[] | number>([90, 480])

    const baseQuery = "/song";

    const searchQuery = (): void => {
        let query: string = makeQuery({ baseQuery, title, duration, sortModel, page })
        updateState(query);
    };

    useEffect(() => {
        searchQuery();
    }, [page, title, sortModel, duration]);

    return (
        <>
            <Grid item xs={8}>
                <TextField
                    data-test="song-search"
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
                        Duration | Min-Max | seconds
                    </Typography>
                    <Slider
                        data-test="quantity-slider"
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
        </>
    );
};

export default SongListView;
