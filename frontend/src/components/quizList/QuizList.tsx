import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getData } from "../../utils/requests";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux/store";
import { useRouter } from "next/router";
import { addIdAndCreator, union } from "../../utils/addFields";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@material-ui/core";
import { IGridQuiz, IQuiz } from "../../typings/IQuiz";
import styles from "./QuizList.module.css";

const QuizList = () => {
    const [rows, setRows] = useState<IGridQuiz[]>([]);

    const router = useRouter();

    const [page, setPage] = useState<number>(1);

    const [maxQuizzes, setMaxQuizzes] = useState<string>("10");

    const [loading, setLoading] = useState(false);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const [next, setNext] = useState<boolean>(true);

    const [cache, setCache] = useState(new Set<IQuiz>());

    const [text, setText] = useState<string>("");

    const [genre, setGenre] = useState<string>("RnB");

    const columns = [
        { field: "title", headerName: "Name", width: 150 },
        { field: "genre", headerName: "Genre", width: 150 },
        { field: "songsLength", headerName: "Songs", width: 130 },
        { field: "creator", headerName: "Created By", width: 150 },
        { field: "createdAt", headerName: "Created At", width: 150 },
    ];

    const rowClick = (event) => {
        console.log(event.data.id);
        router.push("/quiz/" + event.data.id);
    };

    const retreiveData = async () => {
        setLoading(true);
        console.log(rows.length);
        const page2: number = next ? rows.length - 1 : 0;

        // Next is set true when the new page index is bigger than previous page index.
        // Then we check that we are at the end of our cache
        //we dont want to get new items every time we move forward only when we get to the end
        if (next && page * 10 + 9 > cache.size) {
            // const lastSong = rows[page2].createdAt;
            // const risk = maxQuizzes === "0" ?
            let data: IQuiz[] = await getData("/quiz/prevDate=" + rows[page2].createdAt + "-max=" + maxQuizzes, false);
            const newSet = new Set(data);
            setCache((prevState) => {
                return union(prevState, newSet);
            });
            setRows(addIdAndCreator(data));
            setLoading(false);
        } else {
            //calculates the indices for the previous page
            // so we can get directly from cached list instead of making api call.
            //when moving backwards
            const page1 = (page - 1) * 9;
            const page2 = (page - 1) * 9 + 9;
            let i = 0;
            const data = [];
            // make into for each
            for (let value of Array.from(cache)) {
                if (i >= page1 && i <= page2) {
                    data.push(value);
                }
                i++;
            }
            setRows(addIdAndCreator(data));
            setLoading(false);
        }
    };

    const retrieveDataFirstLoad = async () => {
        setLoading(true);
        console.log(text)
        console.log(genre)
        console.log(maxQuizzes)
        const data: IQuiz[] = await getData("/quiz/title=" + text + "-genre=" + genre + " - max=" + maxQuizzes, false);
        // const data: IQuiz[] = await getData("/quiz/max=" + maxQuizzes, false);
        console.log(data);
        setRows(addIdAndCreator(data));
        setFirstLoad(false);
        setCache(new Set(data));
        setLoading(false);
    };

    useEffect(() => {
        firstLoad ? retrieveDataFirstLoad() : retreiveData();
    }, [page]);

    const handlePageChange = (params) => {
        setPage((prevState) => {
            prevState < params.page ? setNext(true) : setNext(false);
            return params.page;
        });
    };

    const searchOnTitle = async (query: string) => {
        const data = await getData("/quiz/title=" + query + "-max=" + maxQuizzes + "-genre=" + genre);
        setRows(addIdAndCreator(data));
        setLoading(false);
    };

    const searchSongQuery = async (query: string) => {
        setLoading(true);
        setCache(new Set());
        query === "" ? retrieveDataFirstLoad() : searchOnTitle(query);
    };

    const searchQuizzes = () => {
        searchSongQuery(text);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    variant="outlined"
                    className={styles.maxWidth}
                    label="Search for title of quiz"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={maxQuizzes}
                    onChange={(event) => setMaxQuizzes(event.target.value)}
                    variant="outlined"
                    className={styles.maxWidth}
                    label="Max number of songs in quiz"
                />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={() => searchQuizzes()} variant="contained" color="primary" className={styles.maxWidth}>
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
                        onRowClick={rowClick}
                        loading={loading}
                    />
                </div>
            </Grid>
        </Grid>
    );
};
export default connect((state: ApplicationState) => state)(QuizList);
