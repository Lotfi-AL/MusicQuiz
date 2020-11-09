import mongoose, { HookNextFunction, Schema } from "mongoose";

interface IQuiz {
    title: string;
    genre: string;
    songs: Schema.Types.ObjectId[];
    songsLength: number;
    creator: Schema.Types.ObjectId;
}
export interface QuizDoc extends IQuiz, mongoose.Document {
    title: string;
    genre: string;
    songs: Schema.Types.ObjectId[];
    songsLength: number;
    creator: Schema.Types.ObjectId;
}

interface QuizModelInterface extends mongoose.Model<any> {
    build(attr: IQuiz): QuizDoc;
}

const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        genre: { type: String, required: true },
        songs: [{ type: Schema.Types.ObjectId, ref: "Song", required: true }],
        songsLength: { type: Number },
        creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

quizSchema.index({ title: "text" });

quizSchema.pre<QuizDoc>("save", function (next: HookNextFunction) {
    this.songsLength = this.songs.length;
    next();
});

quizSchema.statics.build = (attr: IQuiz) => {
    return new Quiz(attr);
};


const Quiz = mongoose.model<QuizDoc, QuizModelInterface>("Quiz", quizSchema);

const build = (attr: IQuiz) => {
    return new Quiz(attr);
};


// Quiz.deleteMany({}, function (err) {
//    if (err) return console.log("not working");
// }); //Deletes all documents from table

export { Quiz };
