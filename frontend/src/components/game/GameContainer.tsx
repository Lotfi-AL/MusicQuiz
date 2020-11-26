import React, { useEffect, useState } from 'react'
import GameView from './GameView'
import { connect } from "react-redux";
import { ApplicationState } from '../../redux/store';
import { getData } from '../../utils/requests';
import { IQuiz } from '../../typings/IQuiz';
import ScoreBoard from './ScoreBoard';
import { ScoreProvider } from '../scoreStore/ScoreProvider';
import Button from '@material-ui/core/Button';
import AddPlayers from './AddPlayers';

const GameContainer = ({ pid }: { pid: string | string[] }) => {

    const [quiz, setQuiz] = useState<IQuiz>(null);
    const [page, setPage] = useState<number>(0);
    const [addPlayers, setAddPlayers] = useState(true);

    useEffect(() => {
        getData("/quiz/" + pid, false)
            .then((data) => {
                setQuiz(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <ScoreProvider>
                {quiz && page < quiz.songs.length ? <><GameView song={quiz.songs[page]} />
                    <ScoreBoard done={false} /></> : <ScoreBoard done={true} />}
                {addPlayers ? <> <AddPlayers /> <Button onClick={() => setAddPlayers(false)}>Finished adding players? </Button> </> : <Button variant={"contained"} onClick={() => setPage(page + 1)}>Next Song in Quiz</Button>}

            </ScoreProvider>
        </div>
    )
}


export default GameContainer;
