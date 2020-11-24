import { Button, Card, TextField } from '@material-ui/core';
import React, { useReducer, useState } from 'react'
import Player from './Player';

const ScoreBoard = ({ done }: { done: boolean }) => {
    // const [players, setPlayers] = useState<[{ name: string, score: number }]>([{ name: "", score: 0 }]);
    // const [players, setPlayers] = useState<{ [name: string]: number }>({});
    const [state, dispatch] = useReducer(reducer, players);
    const [name, setName] = useState("");
    console.log(name);
    const addPlayer = () => {
        // const newPlayer = < Player name={name} />
        // setPlayers([newPlayer, ...players,])
        // setPlayers({ ...players, { name: name, score: 0 } });
        // setPlayers({ ...players, [name]: 0 })
        // console.log(players);
    }
    const incScore = (name) => {
        // setPlayers({ ...players, [name]  })
    }
    return (
        <div>
            { done ? <Card>< h1 > The winner is: </h1></Card > : null
            }
            <TextField onChange={(val) => setName(val.target.value)} value={name} color="primary" variant="outlined" label="type in new player name" />
            <Button onClick={() => incScore(name)}>Inc score</Button>
            {/* {players ? players.map((item) => { return item }) : <h1>no players</h1>} */}
            {/* {players ? players.map((p) => <Player name={p.name} )} */}
            {/* <Players /> */}
            <Button onClick={() => addPlayer()}>Add new player</Button>
        </div >
    )
}

export default ScoreBoard
