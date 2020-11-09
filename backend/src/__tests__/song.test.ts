const request = require("supertest");
import app from "../index";

describe("GET /api/song", () => {
    it("Returns 10 songs", async () => {
        const res = await request(app).get("/api/song");
        expect(res.body.length).toEqual(10);
        expect(res.status).toEqual(200);
    });

    it("Returns correct song as first result", async () => {
        const res = await request(app).get("/api/song/title=bad romance");
        expect(res.body[0].title).toEqual("Bad Romance");
        expect(res.status).toEqual(200);
    });

    it("Returns correct song at certain timestamp", async () => {
        const res = await request(app).get("/api/song/prevDate=2020-10-27T15:08:02.207Z");
        expect(res.body[0].title).toEqual("Bad Romance");
        expect(res.status).toEqual(200);
    });
});
