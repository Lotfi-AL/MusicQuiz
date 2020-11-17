import supertest, { SuperAgentTest } from "supertest";
import server from "../index";

let request: SuperAgentTest;

beforeAll(() => {
    request = supertest.agent(server);
});

afterAll(() => {
    server.close();
});

describe("GET /api/song", () => {
    it("Returns 10 songs", async () => {
        const res = await request.get("/api/song");
        expect(res.body.docs.length).toEqual(10);
        expect(res.status).toEqual(200);
    });

    it("Returns correct song as first result", async () => {
        const res = await request.get("/api/song?title=bad romance");
        expect(res.body.docs[0].title).toEqual("Bad Romance");
        expect(res.status).toEqual(200);
    });

    it("Returns only songs with duration less than 200", async () => {
        const res = await request.get("/api/song?duration[lte]=200");
        expect(res.status).toEqual(200);
        for (let song of res.body.docs) {
            expect(song.duration).toBeLessThanOrEqual(200);
        }
    });

    it("Returns only songs from page 2", async () => {
        const res = await request.get("/api/song?page=2");
        expect(res.status).toEqual(200);
        expect(res.body.page).toEqual(2);
        expect(res.body.docs.length).toEqual(10);
    });

    it("Returns songs sorted by duration DESC", async () => {
        const res = await request.get("/api/song?sort_by=duration&order_by=DESC");
        expect(res.status).toEqual(200);
        let prevSong = { duration: Number.MAX_SAFE_INTEGER };

        for (let song of res.body.docs) {
            expect(song.duration).toBeLessThanOrEqual(prevSong.duration);
            prevSong = song;
        }
    });
});
