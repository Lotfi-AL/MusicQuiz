import express, { Request, Response } from "express";
import { Quiz } from "../models/quiz";
import verifyToken from "../utils/verifyToken";

const router = express.Router();

const quantityChecker = (q: number) => {
    if (q === 0) {
        return Number.MAX_VALUE;
    } else {
        return q;
    }
};

// First ten
router.get("/api/quiz/max=:max", async (req: Request, res: Response) => {
    try {
        const max = quantityChecker(parseInt(req.params.max));
        console.log("max")
        const quizzes = await Quiz.find({ songsLength: { $lte: max } })
            .limit(10)
            .populate("creator", "username")
            .sort("-createdAt")
            .exec();

        console.log(quizzes);

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});

router.get("/api/quiz/genre=:genre", async (req: Request, res: Response) => {
    try {
        const { genre } = req.params;
        console.log("genre")
        const quizzes = await Quiz.find({ genre: genre })
            .limit(10)
            .populate("creator", "username")
            .sort("-createdAt")
            .exec();
        console.log(quizzes)

        return res.status(200).send(quizzes);
    } catch (error) {

        console.log(error);
    }
});

router.get("/api/quiz/id=:id", async (req: Request, res: Response) => {
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

// Title param with textscore sorting
router.get("/api/quiz/title=:title", async (req: Request, res: Response) => {
    try {
        const title = req.params.title;
        console.log("title");
        console.log(req.params)
        if (title === "") {
            const quizzes = await Quiz.find({}).limit(10).populate("creator", "username").exec()
            return res.status(200).send(quizzes)
        }
        const quizzes = await Quiz.find({ $text: { $search: title } }, { score: { $meta: "textScore" } })
            .limit(10)
            .populate("creator", "username")
            .sort({ score: { $meta: "textScore" } })
            .exec();

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});

// Pagination
router.get("/api/quiz/search/:title-:max-:genre", async (req: Request, res: Response) => {
    try {
        // const { createdAtBefore } = req.params;
        console.log(req.params)
        console.log("RIGHT REQUEST")
        const max = quantityChecker(parseInt(req.params.max));
        const quizzes = await Quiz.find({})
            .limit(10)
            .populate("creator", "username")
            .sort("-createdAt")
            .exec();

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});
// Pagination
// this should be the next route we work on. 
router.get("/api/quiz/search", async (req: Request, res: Response) => {
    try {
        // const { createdAtBefore } = req.params;
        console.log(req.params)
        console.log("RIGHT REQUEST")
        const max = quantityChecker(parseInt(req.params.max));
        const quizzes = await Quiz.find({})
            .limit(10)
            .populate("creator", "username")
            .sort("-createdAt")
            .exec();

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});


// Pagination
router.get("/api/quiz/prevDate=:createdAtBefore-max=:max", async (req: Request, res: Response) => {
    try {
        const { createdAtBefore } = req.params;
        const max = quantityChecker(parseInt(req.params.max));
        const quizzes = await Quiz.find({ createdAt: { $lt: createdAtBefore }, songsLength: { $lte: max } })
            .limit(10)
            .populate("creator", "username")
            .sort("-createdAt")
            .exec();

        return res.status(200).send(quizzes);
    } catch (error) {
        console.log(error);
    }
});

router.post("/api/quiz", verifyToken, async (req: Request, res: Response) => {
    try {
        const quiz = Quiz.build(req.body);
        await quiz.save();
        return res.status(201).send(quiz);
    } catch (error) {
        console.log(error);
    }
});

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
