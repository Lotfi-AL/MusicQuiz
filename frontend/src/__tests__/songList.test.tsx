import React from 'react';
import '@testing-library/jest-dom';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import SongListView from "../components/songList/SongListView"

describe("should render songlist", () => {
    test("should render songlist", () => {
        render(<SongListView {...Provider}/>)
    })

})