import { json } from "body-parser";
import express, { Request, Response } from "express";
import { Artist, ArtistDoc } from "../models/artist";

const router = express.Router();

router.get("/api/artist", async (req: Request, res: Response) => {
    try {
        const artists = await Artist.find({});
        return res.status(200).send(artists);
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/artist", async (req: Request, res: Response) => {
    try {
        const name = req.body;
        console.log(name);
        const artist = Artist.build(name);
        await artist.save();
        return res.status(201).send(artist);
    } catch (error) {
        console.log(error);
    }
});

export { router as artistRouter };
