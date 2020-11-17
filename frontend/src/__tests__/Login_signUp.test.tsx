import React from 'react';
import '@testing-library/jest-dom';
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'


describe("should fverify that all inputs are rendered correctly for signIp page", () => {
    const initialState = {output:10, authentication:""}
    const mockStore = configureStore()
    let store;
    test("should find input and button for sign In", () => {
        store = mockStore(initialState)
        render(<Provider store={store}><SignIn /></Provider>)

        expect(screen.getByTestId("username")).toBeVisible();
        fireEvent.change(screen.getByTestId("username"), {target: {value: "test"}})
        expect(screen.getByTestId("username")).toBe("test");
        expect(screen.getByTestId("password")).toBeVisible();
        expect(screen.getByTestId("USB")).toBeVisible();
    });
    test("should fverify that all inputs are rendered correctly for signUp page", () => {
      store = mockStore(initialState);
      render(<Provider store={store}><SignUp /></Provider>)
      expect(screen.getByTestId("username")).toBeVisible();
      expect(screen.getByTestId("password")).toBeVisible();
      expect(screen.getByTestId("USB")).toBeVisible();
  })
  });

