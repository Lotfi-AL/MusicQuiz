import { Button } from '@material-ui/core';
import { Console } from 'console';
import React, { useState } from 'react'

const Player = ({ name }) => {
    const [score, setScore] = useState(0);
    console.log(name);
    return (
        <div>
            {name}
            {score}
            <Button onClick={() => setScore(score + 1)}>+1</Button>
            <Button onClick={() => setScore(score - 1)}>-1</Button>
        </div>
    )
}

export default Player
