import supertest, { Response, SuperAgentTest } from "supertest";
import server from "../index";

let request: SuperAgentTest;

beforeAll(() => {
    request = supertest.agent(server);
});

afterAll(() => {
    server.close();
});

const signInUser = async (username: string, password: string) => {
    return await request
        .post("/api/signIn")
        .send({
            username,
            password,
        })
        .expect(200)
        .then((res: Response) => {
            return res.body;
        })
        .catch((err: Error) => {
            return err;
        });
};

const getSongs = async () => {
    return await request.get("/api/song").then((res: Response) => {
        return res.body.docs.map((item: any) => {
            return item._id;
        });
    });
};

describe("POST /api/quiz", () => {
    const username = "testuser1";
    const password = "testuser1";
    let user: any;
    let songs: any;

    beforeAll(async () => {
        user = await signInUser(username, password);
        songs = await getSongs();
    });

    it("Returns new quiz", async () => {
        const res = await request
            .post("/api/quiz")
            .set("Authorization", "Bearer " + user.token)
            .send({
                title: "test-quiz",
                genre: "rock",
                songs: songs,
                creator: user.id,
            });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("creator");
    });
});

describe("GET /api/quiz", () => {
    it("Returns 10 quizzes", async () => {
        const res = await request.get("/api/quiz");
        expect(res.body.docs.length).toEqual(10);
        expect(res.status).toEqual(200);
    });

    it("Returns rock genre from all quizzes", async () => {
        const res = await request.get("/api/quiz?genre=rock");
        expect(res.status).toEqual(200);
        for (let quiz of res.body.docs) {
            expect(quiz.genre).toEqual("rock");
        }
    });

    it("Returns only quizzes with less than or equal 5 songs", async () => {
        const res = await request.get("/api/quiz?quantity[lte]=5");
        expect(res.status).toEqual(200);
        for (let quiz of res.body.docs) {
            expect(quiz.songsLength).toBeLessThanOrEqual(5);
        }
    });

    it("Returns only quizzes from page 2", async () => {
        const res = await request.get("/api/quiz?page=2");
        expect(res.status).toEqual(200);
        expect(res.body.page).toEqual(2);
        expect(res.body.docs.length).toEqual(10);
    });

    it("Returns quizzes sorted by songsLength DESC", async () => {
        const res = await request.get("/api/quiz?sort_by=songsLength&order_by=DESC");
        expect(res.status).toEqual(200);
        let prevQuiz = { songsLength: Number.MAX_SAFE_INTEGER };

        for (let quiz of res.body.docs) {
            expect(quiz.songsLength).toBeLessThanOrEqual(prevQuiz.songsLength);
            prevQuiz = quiz;
        }
    });
});
