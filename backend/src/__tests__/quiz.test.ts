const request = require("supertest");
import app from "../index";

/*
const signInUser = async () => {
    return await request(app)
        .post("/api/signIn")
        .send({
            username: "testuser",
            password: "testpassword",
        })
        .expect(200)
        .end((res: Response) => {
            return res.body.token;
        });
};

describe("POST /api/quiz", () => {
    const token = before(signInUser());

    it("Returns new quiz", async () => {
        const res = await request(app)
            .post("/api/quiz")
            .set("Authorization", "Bearer " + token)
            .send({
                title: "test-quiz",
                genre: "rock",
                songs: [],
                creator: "",
            });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("post");
    });
});

*/

/*
describe("GET /api/quiz", () => {
    it("Returns 10 quizzes", async () => {
        const res = await request(app).get("/api/quiz");
        expect(res.body.length).toEqual(10);
        expect(res.status).toEqual(200);
    });

    it("Returns correct quiz as first result", async () => {
        const res = await request(app).get("/api/quiz/title=bad romance");
        expect(res.body[0].title).toEqual("Bad Romance");
        expect(res.status).toEqual(200);
    });

    it("Returns correct quiz at certain timestamp", async () => {
        const res = await request(app).get("/api/quiz/prevDate=2020-10-27T15:08:02.207Z");
        expect(res.body[0].title).toEqual("Bad Romance");
        expect(res.status).toEqual(200);
    });
});
*/
