import { Button, Card } from '@material-ui/core';
import React, { useState } from 'react'
import ISong from '../../typings/ISong'

const GameView = ({ song }: { song: ISong }) => {
    const [show, setShow] = useState<boolean>(false);
    console.log(song);
    return (
        <div>

            {show ? <Card><h1>Artist: {song.artist[0].name}</h1>
                <h1>Title: {song.title}</h1></Card> : <h1>Play song!</h1>}
            <Button onClick={() => setShow(!show)}>{show ? "hide answer" : "Show answer?"}</Button>
        </div>
    )
}

export default GameView
