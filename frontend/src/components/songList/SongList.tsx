import { Button, Grid, TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { BookmarkBorderSharp } from "@material-ui/icons";
import * as React from "react";
import { getData } from "../../utils/requests";
import addIdAndArtist from "../../utils/addFields";
import ISong from "../../typings/ISong";
import { IGridSong } from "../../typings/ISong";
import { useState, useEffect } from "react";
import styles from "./SongList.module.css";

export default function SongList(props?) {
    const [page, setPage] = useState<number>(1);

    const [rows, setRows] = useState<IGridSong[]>([]);

    const [loading, setLoading] = useState(false);

    const [firstLoad, setFirstLoad] = useState(true);

    const [next, setNext] = useState(true);

    const [text, setText] = useState("");

    const [cache, setCache] = useState(new Set<ISong>());

    function union(setA, setB) {
        let _union = new Set<ISong>(setA);
        for (let elem of setB) {
            _union.add(elem);
        }
        return _union;
    }

    // function to retrieve the new songs either from the api or from a list if we already have the data.
    //gets data from api with pagination. sends in the last element on current row and its createdAt
    //then mongodb returns the next 10 elements.
    const retreiveData = async () => {
        setLoading(true);
        const page2: number = next ? rows.length - 1 : 0;

        // Next is set true when the new page index is bigger than previous page index.
        // Then we check that we are at the end of our cache
        //we dont want to get new items every time we move forward only when we get to the end
        if (next && page * 10 + 9 > cache.size) {
            // const lastSong = rows[page2].createdAt;
            let songs: ISong[] = await getData("/song/prevDate=" + rows[page2].createdAt, false);
            const newSet = new Set(songs);
            setCache((prevState) => {
                return union(prevState, newSet);
            });
            setRows(addIdAndArtist(songs));
            setLoading(false);
        } else {
            //calculates the indices for the previous page
            // so we can get directly from cached list instead of making api call.
            //when moving backwards
            const page1 = (page - 1) * 10;
            const page2 = (page - 1) * 10 + 9;
            let i = 0;
            const songs = [];
            // make into for each
            for (let value of Array.from(cache)) {
                if (i >= page1 && i <= page2) {
                    songs.push(value);
                }
                i++;
            }
            setRows(addIdAndArtist(songs));
            setLoading(false);
        }
    };

    //runs on first load
    const retrieveDataFirstLoad = async () => {
        setLoading(true);
        const songs: ISong[] = await getData("/song", false);
        setRows(addIdAndArtist(songs));
        setFirstLoad(false);
        setCache(new Set(songs));
        setLoading(false);
    };

    const getSongId = (event) => {
        const isprop = props.add;
        if (isprop) {
            props.add(event.data);
        } else {
            console.log(props);
        }
    };

    //searches based on the query and gets the data from database
    //if query is empty load the 10 first songs

    const searchOnTitle = async (query: string) => {
        const songs = await getData("/song/search=" + query);
        setRows(addIdAndArtist(songs));
        setLoading(false);
    };

    // if the search field is empty we load from the beginning again
    // otherwise we do a search on title
    const searchSongQuery = async (query: string) => {
        setLoading(true);
        query === "" ? retrieveDataFirstLoad() : searchOnTitle(query);
    };

    const searchSongs = () => {
        setCache(new Set());
        searchSongQuery(text);
    };

    useEffect(() => {
        firstLoad ? retrieveDataFirstLoad() : retreiveData();
    }, [page]);

    useEffect(() => {
        firstLoad ? console.log("first") : searchSongs();
    }, [text])

    const columns = [
        {
            field: "id",
            hide: true,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
        },
        { field: "bpm", headerName: "BPM", width: 120 },
        { field: "artist", headerName: "Artist", width: 240 },
        { field: "genre", headerName: "Genre", width: 120 },
        { field: "duration", headerName: "Duration", width: 120 },
    ];

    //if we are moving forwad sets next to true otherwise false.
    const handlePageChange = (params) => {
        setPage((prevState) => {
            prevState < params.page ? setNext(true) : setNext(false);
            return params.page;
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    variant="outlined"
                    label="Search for a song"
                    className={styles.maxWidth}
                />
            </Grid>
            <Grid item xs={4}>
                <Button onClick={() => searchSongs()} variant="contained" color="primary" className={styles.maxWidth}>
                    Search
                </Button>
            </Grid>
            <Grid item xs={12}>
                <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pagination
                        pageSize={10}
                        rowCount={cache.size + 10}
                        paginationMode="server"
                        onPageChange={handlePageChange}
                        onRowClick={getSongId}
                        loading={loading}
                    />
                </div>
            </Grid>
        </Grid>
    );
}
