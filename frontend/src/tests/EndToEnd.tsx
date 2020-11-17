import React from 'react';
import { shallow } from 'enzyme';
import SignIn from '../pages/signIn';
import { getData, postData } from '../utils/requests';
import { isValidToken } from '../redux/authentication/reducer';

import 'whatwg-fetch';


describe('SignIn SignUp CreateQuiz getSong end to end test', () => {
    let username = "";
    let token = "";
    let createdQuiz = null;
    const testQuiz =
    {
        "title": "trololo",
        "genre": "rock",
        "creator": "",
        "songs": [
            "5f9b2e3107bcb90018d29172",
            "5f9b2e3107bcb90018d29171"
        ]
    }
    //username has to be unique so we make a new one each time. 

    username = Math.random().toString()
    const usek = { "username": username, "password": "test" }
    it("should post a new user", (done) => {
        postData("/signUp", usek).then((res) => {
            console.log(res);
            expect(res.success).toEqual(true);
            done();
        }).catch((error) => {
            fail();
        });

    })

    it("should login the new user", (done) => {
        postData("/signIn", { "username": username, "password": "test" }).then((res) => {
            token = res.token;
            expect(res.success).toEqual(true);
            localStorage.setItem("USER-TOKEN", token);
            done();
        }).catch((error) => {
            fail()
        })
    });

    it("should create a quiz", (done) => {
        const creator: string = isValidToken(localStorage.getItem("USER-TOKEN"))._id;
        testQuiz["creator"] = creator;
        let validJson = { ...testQuiz, "creator": creator }
        postData("/quiz", validJson, true).then((res) => {
            createdQuiz = res;
            expect(createdQuiz !== null).toEqual(true);
            done();
        }).catch(error => {
            fail(error);
        })
    })

    it("should get 10 songs", (done) => {
        getData("/song").then(res => {
            expect(res.length).toEqual(10);
            done();
        }).catch(error => {
            fail(error);
        })

    })

});
