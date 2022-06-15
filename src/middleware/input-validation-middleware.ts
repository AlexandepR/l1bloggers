import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidationMiddleware = (
    req:Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            codeResult: 1,
            errors: errors.array()})
        return
        //     }
        // if (!newBlogger) {
        //     res.sendStatus(400).send({
        //         errorsMessages: [{
        //             message: "string",
        //             field: 'string'
        //         }],
        //     })
        //     return
    } else {
        next()
    }
}