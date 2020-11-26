import { Button } from '@material-ui/core';
import { Console } from 'console';
import React, { useState } from 'react'
import { useStatus } from '../scoreStore/ScoreProvider';

const Player = ({ name, index, score }) => {
    const { incScore, getScore } = useStatus()
    console.log(name);
    return (
        <div>
            {name}
            {score}
            <Button onClick={() => incScore(index, 1)}>+1</Button>
            <Button onClick={() => incScore(index, -1)}>-1</Button>
        </div>
    )
}

export default Player
