import { createUser, signInUser } from "../services/user";
import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const savedUser = await createUser(req.body);
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const { token } = await signInUser(payload);
        res.status(200).json({
            success: true,
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
};
