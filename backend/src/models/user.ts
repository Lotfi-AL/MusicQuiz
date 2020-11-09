import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    ref: "User";
}

const userSchema = new Schema({
    username: { type: String, required: [true, "Username required"] },
    password: { type: String, required: [true, "Password required"] },
});

const User = model<IUser & Document>("User", userSchema);

export const build = (attr: IUser) => {
    return new User(attr);
};

export default User;
