import { createUser, signInUser } from "../services/user";
import express, { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        const { token, id } = await signInUser(payload);
        res.status(200).json({
            success: true,
            token: token,
            id: id,
        });
    } catch (error) {
        console.log(error);
    }
};
