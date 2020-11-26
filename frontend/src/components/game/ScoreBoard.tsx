import { Button, Card, TextField } from '@material-ui/core';
import { stringify } from 'querystring';
import React, { useReducer, useState } from 'react'
import Player from './Player';

import { useStatus } from "../scoreStore/ScoreProvider";
import { playerType } from '../scoreStore/ScoreContext';

const ScoreBoard = ({ done }: { done: boolean }) => {
    const { players, getHighestScore } = useStatus();
    return (
        <div>
            { done ? <Card>< h1 > The winner is:{getHighestScore().name} </h1></Card > : null
            }
            {players.map((player, index) => {
                return (<Player name={player.name} index={index} score={player.score} />)
            })}
        </div >
    )
}

export default ScoreBoard
