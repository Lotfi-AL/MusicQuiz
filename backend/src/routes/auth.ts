import express, { Request, Response } from "express";

import { signUp, signIn } from "../controller/user";

const router = express.Router();

router.post("/api/signUp", signUp);
router.post("/api/signIn", signIn);

export default router;
