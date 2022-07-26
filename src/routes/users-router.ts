import {Request, Response, Router} from "express";
import {body} from "express-validator";


export const usersRouter = Router({})
export const loginValidation = body('login')
    .trim().exists().notEmpty().isLength({min: 3, max: 10}).withMessage('Login should be from 3 to 10 symbols')
export const passwordValidation = body('password')
    .trim().exists().notEmpty().isLength({min: 6, max: 20}).withMessage('Password should be from 6 to 20 symbols')


usersRouter.get('/', (req:Request, res:Response) => {

})
usersRouter.post('/', (req:Request, res: Response) => {

})
usersRouter.delete('/:id', (req:Request, res:Response) => {

})