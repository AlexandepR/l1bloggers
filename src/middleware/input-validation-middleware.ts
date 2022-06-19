import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {youtubeUrlValidator} from "../routes/bloggers-router";


export const inputValidationMiddleware = (
    req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400)
        res.send({
            errorsMessages: [{
                message: "string",
                field: `${youtubeUrlValidator}`
            }]
        })
        return
    } else {
        next()
    }
}