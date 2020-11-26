import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useStatus } from '../scoreStore/ScoreProvider'

const AddPlayers = () => {
    const { addPlayer } = useStatus();
    const [name, setName] = useState("");
    return (
        <>
            <TextField
                onChange={(val) => setName(val.target.value)} value={name} color="primary" variant="outlined" label="type in new player name" />
            <Button onClick={() => addPlayer({ name: name, score: 0 })}>Add new player</Button>
        </>
    )
}

export default AddPlayers
