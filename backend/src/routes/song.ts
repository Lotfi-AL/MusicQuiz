import express, { Request, Response } from "express";
import { Song } from "../models/song";
import { Artist } from "../models/artist";

const router = express.Router();

// Pagination
router.get("/api/song", async (req: Request, res: Response) => {
    try {
        const { page, limit, sort_by, order_by, title } = req.query;

        const options = {
            sort: sort_by ? { [sort_by as string]: order_by } : { createdAt: "desc" },
            populate: { path: "artist", select: "name" },
            lean: true,
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 10,
        };

        const query = { $and: [title ? { $text: { $search: title as string } } : {}] };

        const songs = await Song.paginate(query, options)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

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
