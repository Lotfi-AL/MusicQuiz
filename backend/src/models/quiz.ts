import mongoose, { HookNextFunction, Schema, Document, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IQuiz {
    title: string;
    genre: string;
    songs: Schema.Types.ObjectId[];
    songsLength: number;
    creator: Schema.Types.ObjectId;
}
export interface QuizDoc extends IQuiz, Document {
    title: string;
    genre: string;
    songs: Schema.Types.ObjectId[];
    songsLength: number;
    creator: Schema.Types.ObjectId;
}

interface QuizModelInterface<T extends Document> extends PaginateModel<T> {
    build(attr: IQuiz): QuizDoc;
}

const quizSchema = new Schema(
    {
        title: { type: String, required: true },
        genre: {
            type: String,
            enum: ["Pop", "Rock", "Electronic", "Hip-Hop", "Classical", "R&B", "Blues", "Metal"],
            required: true,
        },
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

quizSchema.plugin(mongoosePaginate);

export const Quiz = mongoose.model<QuizDoc, QuizModelInterface<QuizDoc>>("Quiz", quizSchema);

const build = (attr: IQuiz) => {
    return new Quiz(attr);
};

// Quiz.deleteMany({}, function (err) {
//    if (err) return console.log("not working");
// }); //Deletes all documents from table
