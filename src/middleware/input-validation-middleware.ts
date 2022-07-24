import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const inputValidationMiddleware = (
    req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    let errorsMessages = errors.array({onlyFirstError: true}).map(err => ({
        message: err.msg,
        field: err.param
    }))
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


