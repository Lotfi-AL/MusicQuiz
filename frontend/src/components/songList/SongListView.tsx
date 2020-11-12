import { Button, Grid, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getData } from 'src/utils/requests';
import { setSourceMapRange } from 'typescript';
import styles from "./SongListView.module.css";


let pageSize = 10;

const SongListView = ({ updateState, page }) => {
    const router = useRouter();

    const [title, setTitle] = useState<string>("");

    const [newSearch, setNewSearch] = useState(false)

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const baseQuery = "/song";

    const makeQuery = () => {
        let search: string = baseQuery + "?";
        if (pageSize !== 0) {
            search += "&limit=" + pageSize
        }
        if (title !== "") {
            search += "&title=" + title
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
    }, [page, title]);


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
                <Button onClick={() => searchQuery()} variant="contained" color="primary" className={styles.maxWidth}>
                    Search
                </Button>
            </Grid>
        </>
    )
}

export default SongListView
