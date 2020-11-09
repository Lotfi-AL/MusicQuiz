import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        //req.token = bearerToken;

        let decoded: any = jwt.verify(bearerToken, "secretkey");
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
};

export default verifyToken;
