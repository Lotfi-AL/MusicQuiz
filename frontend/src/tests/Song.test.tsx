import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Song from '../components/songList/Song';
import postData from "../utils/requests"
import { ListItem, ListItemText } from '@material-ui/core';
interface ISong {
    title: string;
    bpm: number;
    artist: string;
    genre: string;
    duration: number;
}
describe('Song', () => {
    let wrapper;
    let shallow;
    const songExample: ISong = { title: "test", bpm: 200, artist: "admin", genre: "rock", duration: 50 }
    beforeAll(() => {
        shallow = createShallow();
    })
    //         < ListItem >
    //     <ListItemText primary={props.title}></ListItemText>
    //     <ListItemText primary={props.duration}></ListItemText>
    //     <ListItemText primary={props.artist}></ListItemText>
    //     <ListItemText primary={props.url}></ListItemText>
    // </ListItem >

    beforeEach(() => (wrapper = shallow(<Song {...songExample} />)));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it("renders a <ListItem/>  ", () => {
        expect(wrapper.find(ListItem)).toHaveLength(1);
    })

    // it('should render the QuizList', () => {
    //     expect(wrapper.containsMatchingElement(<QuizList />)).toEqual(true);
    // });


    it("should render title,duration,artist and the genre correctly", () => {
        expect(wrapper.containsMatchingElement(<ListItemText primary={songExample.title} />))
        expect(wrapper.containsMatchingElement(<ListItemText primary={songExample.bpm} />))
        expect(wrapper.containsMatchingElement(<ListItemText primary={songExample.artist} />))
        expect(wrapper.containsMatchingElement(<ListItemText primary={songExample.genre} />))
        expect(wrapper.containsMatchingElement(<ListItemText primary={songExample.duration} />))
    });
});
