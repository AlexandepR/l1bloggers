import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {youtubeUrlValidator} from "../routes/bloggers-router";


export const inputValidationMiddleware = (
    req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    let errorsMessages = errors.array().map(err => ({
        message: err.msg,
        field: err.param
    }))
    console.log(errors)
    console.log(errorsMessages)
    errorsMessages = errorsMessages.filter((err, index) => {
        const findIndex = errorsMessages.findIndex((innerErr => innerErr.field === err.field))
        return findIndex === index
    })
    if (!errors.isEmpty()) {
        res.status(400)
        res.send({
            errorsMessages
        })
        return
    } else {
        next()
    }
}


