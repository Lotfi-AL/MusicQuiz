import * as bcrypt from "bcryptjs";
import { IUser } from "../models/user";

import User from "../models/user";
import getSignedToken from "../utils/signedToken";

export const createUser = async (payload: IUser) => {
    const user: IUser = payload;
    const { username, password } = user;
    console.log("username is:" + username);
    console.log("password is:" + password);
    console.log(payload);
    return User.find({ username: username })
        .exec()
        .then((user) => {
            if (user.length > 0) {
                throw new Error("User already exist");
            }
            return bcrypt.hash(password, 10).then((hashed) => {
                const newUser = new User({ username: username, password: hashed });
                return newUser.save();
            });
        });
};

export const signInUser = async (payload: IUser) => {
    const user: IUser = payload;
    const { username, password } = user;
    return User.findOne({ username: payload.username })
        .exec()
        .then((user) => {
            if (!user) {
                throw new Error("Please enter username or password");
            } else {
                return bcrypt
                    .compare(payload.password, user.password)
                    .then((res) => {
                        if (res) {
                            const token = getSignedToken(user._id);
                            return { token };
                        } else {
                            throw new Error("Incorrect password or username, try again");
                        }
                    })
                    .catch((err) => {
                        throw new Error("All field required");
                    });
            }
        });
};
