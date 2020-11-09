import mongoose, { Schema } from "mongoose";

export interface ISong {
    title: string;
    bpm: Number;
    artist: Schema.Types.ObjectId;
    ref: "Artist";
    genre: string;
    duration: Number;
}
interface SongDoc extends mongoose.Document {
    title: string;
    bpm: Number;
    artist: [{ type: Schema.Types.ObjectId; ref: "Artist" }];
    genre: string;
    duration: Number;
}
interface songModelInterface extends mongoose.Model<any> {
    build(attr: ISong): SongDoc;
}
const songSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        bpm: { type: Number, required: true },
        artist: [{ type: Schema.Types.ObjectId, ref: "Artist", required: true }],
        genre: { type: String, required: false },
        duration: { type: Number, required: false },
    },
    { timestamps: true },
);

songSchema.index({ title: "text" });

songSchema.statics.build = (attr: ISong) => {
    return new Song(attr);
};
const Song = mongoose.model<SongDoc, songModelInterface>("Song", songSchema);

const build = (attr: ISong) => {
    return new Song(attr);
};

// Song.deleteMany({}, function (err) {
//    if (err) return console.log("not working");
// }); //Deletes all documents from table

export { Song };
