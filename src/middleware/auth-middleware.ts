import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {youtubeUrlValidator} from "../routes/bloggers-router";

const auth = {login: 'Alex', password: 'qwerty'}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (true) {
        next()
    }
     else {
        res.status(401)
    }
}
