import express, { Request, Response } from "express";
import { Quiz } from "../models/quiz";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

type RangeQuery = {
    lt: number;
    lte: number;
    gt: number;
    gte: number;
};

// Get single quiz
router.get("/api/quiz/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id)
            .populate("creator", "username")
            .populate({ path: "songs", populate: { path: "artist" } })
            .exec();

        return res.status(200).send(quiz);
    } catch (error) {
        console.log(error);
    }
});

// Pagination
router.get("/api/quiz", async (req: Request, res: Response) => {
    try {
        const { page, limit, sort_by, order_by, genre, title } = req.query;

        const quantity: RangeQuery = req.query.quantity as any;

        const options = {
            sort: sort_by && order_by ? { [sort_by as string]: order_by } : { createdAt: "desc" },
            populate: { path: "creator", select: "username" },
            lean: true,
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 10,
        };

        const query = {
            $and: [
                quantity
                    ? {
                          $and: [
                              quantity.lt ? { songsLength: { $lt: quantity.lt } } : {},
                              quantity.lte ? { songsLength: { $lte: quantity.lte } } : {},
                              quantity.gt ? { songsLength: { $gt: quantity.gt } } : {},
                              quantity.gte ? { songsLength: { $gte: quantity.gte } } : {},
                          ],
                      }
                    : {},
                genre ? { genre: { $in: genre as string[] } } : {},
                title ? { $text: { $search: title as string } } : {},
            ],
        };

        const quizzes = await Quiz.paginate(query, options)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
            });

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});

// Create new quiz with token verification
router.post("/api/quiz", verifyToken, async (req: Request, res: Response) => {
    try {
        const quiz = Quiz.build(req.body);
        await quiz.save();
        return res.status(201).send(quiz);
    } catch (error) {
        console.log(error);
    }
});

// Delete quiz with token verification
router.delete("/api/quiz/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const quiz = await Quiz.findByIdAndDelete(id);

        return res.status(200).send(quiz);
    } catch (error) {
        console.log(error);
    }
});

export { router as quizRouter };
