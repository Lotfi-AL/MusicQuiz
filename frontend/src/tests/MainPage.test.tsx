import React from 'react';
import { shallow } from 'enzyme';
import MainPage from "../pages/MainPage";
import { QuizList } from "../components/quizList";
import { CreateQuiz } from "../pages/CreateQuiz";
import { SongList } from "../components/songList";

import Link from "next/link";
import { CreateQuizBtn } from '../components/createQuizBtn';

describe('MainPage', () => {
    let wrapper;
    beforeEach(() => (wrapper = shallow(<MainPage />)));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(0);
    });

    it('should render the QuizList', () => {
        expect(wrapper.containsMatchingElement(<QuizList />)).toEqual(true);
    });
    it('should render the SongList', () => {
        expect(wrapper.containsMatchingElement(<SongList />)).toEqual(true);
    });
    it('should render a link to /createQuiz', () => {
        expect(wrapper.containsMatchingElement(<CreateQuizBtn />)).toEqual(true);
    });
});
