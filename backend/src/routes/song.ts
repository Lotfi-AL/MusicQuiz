import express, { Request, Response } from "express";
import { Song } from "../models/song";
import { Artist } from "../models/artist";

const router = express.Router();

// First ten
/*
router.get("/api/song", async (req: Request, res: Response) => {
    try {
        const songs = await Song.find().limit(10).populate("artist").sort("-createdAt").exec();

        return res.status(200).send(songs);
    } catch (error) {
        console.log(error);
    }
});*/

// Title param with textscore sorting
router.get("/api/song/title=:title", async (req: Request, res: Response) => {
    try {
        const { title } = req.params;

        const songs = await Song.find({ $text: { $search: title } }, { score: { $meta: "textScore" } })
            .limit(10)
            .populate("artist")
            .sort({ score: { $meta: "textScore" } })
            .exec();

        return res.status(200).send(songs);
    } catch (error) {
        console.log(error);
    }
});

// Pagination
router.get("/api/song", async (req: Request, res: Response) => {
    try {
        const { offset, limit, sort_by, order_by, q } = req.query;

        const options = {
            sort: sort_by != undefined ? { [sort_by as string]: order_by } : { createdAt: "desc" },
            populate: "artist",
            lean: true,
            offset: offset != undefined ? parseInt(offset as string) : 0,
            limit: limit != undefined ? parseInt(limit as string) : 10,
        };

        const query = q != undefined ? { $text: { $search: q as string } } : {};

        const songs = await Song.paginate(query, options)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

        /*
        const { createdAtBefore } = req.params;

        const songs = await Song.find({ createdAt: { $lt: createdAtBefore } })
            .limit(10)
            .populate("artist")
            .sort("-createdAt")
            .exec();

        */

        return res.status(200).send(songs);
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/song", async (req: Request, res: Response) => {
    try {
        const name = req.body;
        const id = await Artist.find({ name: name.artist }).exec();
        req.body.artist = id;
        console.log(name);
        const song = Song.build(name);
        await song.save();
        return res.status(201).send(song);
    } catch (error) {
        console.log(error);
    }
});

export { router as songRouter };
