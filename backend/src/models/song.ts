import mongoose, { Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface ISong {
    title: string;
    bpm: Number;
    artist: Schema.Types.ObjectId;
    ref: "Artist";
    genre: string;
    duration: Number;
}
interface SongDoc extends Document {
    title: string;
    bpm: Number;
    artist: [{ type: Schema.Types.ObjectId; ref: "Artist" }];
    genre: string;
    duration: Number;
}

interface SongModelInterface<T extends Document> extends PaginateModel<T> {
    build(attr: ISong): SongDoc;
}
const songSchema = new Schema(
    {
        title: { type: String, required: true },
        bpm: { type: Number, required: true },
        artist: [{ type: Schema.Types.ObjectId, ref: "Artist", required: true }],
        genre: { type: String, required: false },
        duration: { type: Number, required: false },
    },
    { timestamps: true },
);

songSchema.statics.build = (attr: ISong) => {
    return new Song(attr);
};

songSchema.plugin(mongoosePaginate);

export const Song = mongoose.model<SongDoc, SongModelInterface<SongDoc>>("Song", songSchema);

const build = (attr: ISong) => {
    return new Song(attr);
};

// Song.deleteMany({}, function (err) {
//    if (err) return console.log("not working");
// }); //Deletes all documents from table
