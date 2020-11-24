import React, { useEffect, useState } from 'react'
import GameView from './GameView'
import { connect } from "react-redux";
import { ApplicationState } from '../../redux/store';
import { getData } from '../../utils/requests';
import { IQuiz } from '../../typings/IQuiz';
import ScoreBoard from './ScoreBoard';

const GameContainer = ({ page, pid }: { page: number, pid: string | string[] }) => {

    const [quiz, setQuiz] = useState<IQuiz>(null);
    console.log(quiz);
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
            {quiz && page < quiz.songs.length ? <><GameView song={quiz.songs[page]} />
                <ScoreBoard done={false} /></> : <ScoreBoard done={true} />}
            {}
        </div>
    )
}


export default GameContainer;
