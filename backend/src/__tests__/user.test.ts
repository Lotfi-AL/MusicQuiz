import supertest, { Response, SuperAgentTest } from "supertest";
import server from "../index";

let request: SuperAgentTest;

beforeAll(() => {
    request = supertest.agent(server);
});

afterAll(() => {
    server.close();
});

describe("User sign up and in", () => {
    const username = "testUsername";
    const password = "testPassword";
    let user: any;
    let songs: any;

    it("Create new user", async () => {
        await request.post("/api/signUp").send({ username, password }).expect(200);
    });

    it("Sign into newly created user", async () => {
        await request
            .post("/api/signIn")
            .send({
                username,
                password,
            })
            .expect(200)
            .catch((err: Error) => {
                return err;
            });
    });
});
