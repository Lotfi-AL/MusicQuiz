import React from 'react';
import '@testing-library/jest-dom';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import SongListView from "../components/songList/SongListView"
import SongListContainer from "../components/songList/SongListContainer"
import {ISortModel} from "../typings/ISortModel"


describe("should render songlist", () => {
    const initialState = {updateState:"", page: "", sortModel:{field: "", sortDirection: ""}}
    const mockStore = configureStore()
    let store;


    test("should render songlist", () => {
        store = mockStore(initialState)
        render(<SongListView {...store}/>);
        

    })

})