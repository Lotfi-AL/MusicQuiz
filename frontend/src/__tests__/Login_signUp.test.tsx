import React from 'react';
import '@testing-library/jest-dom';
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'


describe("should fverify that all inputs are rendered correctly for signIp page", () => {
    const initialState = {output:10, authentication:""}
    const mockStore = configureStore()
    let store;
    beforeEach(() => {
        store = mockStore(initialState) //mocking state

    })
    afterEach(() => {
        store = {}
    })
    test("should find input and button for sign In", () => {
        render(<Provider store={store}><SignIn /></Provider>) //rendrings sign in page
        //getting input field for username and password
        const user = screen.getByTestId("username")
        const password = screen.getByTestId("password")
        expect(user).toBeVisible();     //inputfield is visible
        userEvent.type(user, 'testuser1')       //write username to inputfield
        expect(user).toHaveValue('testuser1')
        //repeat the above for password
        expect(password).toBeVisible();
        userEvent.type(password, 'testuser1')
        expect(password).toHaveValue('testuser1');
        expect(screen.getByTestId("USB")).toBeVisible();
    });
    test("should fverify that all inputs are rendered correctly for signUp page", () => {
      render(<Provider store={store}><SignUp /></Provider>)

      const user = screen.getByTestId("username")
      const password = screen.getByTestId("password")
      expect(user).toBeVisible();     //inputfield is visible
      userEvent.type(user, 'testuser1')       //write username to inputfield
      expect(user).toHaveValue('testuser1')
      //repeat the above for password
      expect(password).toBeVisible();
      userEvent.type(password, 'testuser1')
      expect(password).toHaveValue('testuser1');
      expect(screen.getByTestId("USB")).toBeVisible();
  })
  });

