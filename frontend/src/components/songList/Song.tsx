import { ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
interface ISong {
    title: string;
    bpm: Number;
    artist: string;
    genre: string;
}

export const Song = (props: ISong) => {

    return (
        <ListItem>
            <ListItemText primary={props.title}></ListItemText>
            <ListItemText primary={props.bpm}></ListItemText>
            {/* <ListItemText primary={props.artist}></ListItemText> */}
            <ListItemText primary={props.genre}></ListItemText>
        </ListItem>
    )
}

export default Song;