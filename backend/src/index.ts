import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

import authRouter from "./routes/auth";
import { songRouter } from "./routes/song";
import { artistRouter } from "./routes/artist";
import { quizRouter } from "./routes/quiz";

import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.use(authRouter);
app.use(artistRouter);
app.use(songRouter);
app.use(quizRouter);

const port = process.env.PORT || 1337;
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose
    .connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
