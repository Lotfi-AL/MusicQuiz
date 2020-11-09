import mongoose, { Schema } from "mongoose";

interface IArtist {
    name: String;
}
export interface ArtistDoc extends mongoose.Document {
    name: String;
}
interface artistModelInterface extends mongoose.Model<any> {
    build(attr: IArtist): ArtistDoc;
}

const artistSchema = new Schema({
    name: { type: String },
});

artistSchema.statics.build = (attr: IArtist) => {
    return new Artist(attr);
};
const Artist = mongoose.model<ArtistDoc, artistModelInterface>("Artist", artistSchema);

const build = (attr: IArtist) => {
    return new Artist(attr);
};

//Artist.deleteMany({}, function (err) {
//     if (err) return console.log("not working");
// }); //Deletes all documents from table

export { Artist };
