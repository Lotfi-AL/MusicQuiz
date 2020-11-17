import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store';
import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import userEvent from '@testing-library/user-event'
import NavBar from 'src/components/navBar/NavBar';


describe("should render navbar", () => {
    const initialState = {output:10}
    const mockStore = configureStore()
    let store;

    test('it should render', () => {
        store = mockStore(initialState) //mocking state
        render(<Provider store={store}><NavBar /></Provider>)

    })
})