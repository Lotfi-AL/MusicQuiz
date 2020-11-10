import express, { Request, Response } from "express";
import { Song } from "../models/song";
import { Artist } from "../models/artist";
const router = express.Router();

// First ten
router.get("/api/song", async (req: Request, res: Response) => {
    try {
        const songs = await Song.find().limit(10).populate("artist").sort("-createdAt").exec();

        return res.status(200).send(songs);
    } catch (error) {
        console.log(error);
    }
});

// Title param with textscore sorting
router.get("/api/song/title=:title", async (req: Request, res: Response) => {
    try {
        const { title } = req.params;
        console.log(title)
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
router.get("/api/song/search=:search", async (req: Request, res: Response) => {
    try{
        const {search} = req.params;
        const regex = new RegExp(search, 'i');
        const artist = await Artist.find(
            {name: {$regex: regex}}
        )
        .limit(1)
        .exec()
        const songs = await Song.find(
            {
                $or:[
                    {artist: {_id: artist ? artist[0]._id : null}},
                    {title: {$regex: regex}}
                ]
            }

        )
            .limit(10)
            .populate("artist")
            .exec()
        console.log(songs)
    return res.status(200).send(songs)
    } catch (error) {
        console.log(error);
        res.status(200).send([])
    }
});
// Pagination
router.get("/api/song/prevDate=:createdAtBefore", async (req: Request, res: Response) => {
    try {
        const { createdAtBefore } = req.params;

        const songs = await Song.find({ createdAt: { $lt: createdAtBefore } })
            .limit(10)
            .populate("artist")
            .sort("-createdAt")
            .exec();

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
