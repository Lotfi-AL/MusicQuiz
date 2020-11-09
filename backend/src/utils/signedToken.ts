import * as jwt from "jsonwebtoken";

// import key from "../keys";

const getSignedToken = function (id: Number) {
    return jwt.sign({ _id: id }, "secretkey", { expiresIn: "1hr" });
};

export default getSignedToken; 