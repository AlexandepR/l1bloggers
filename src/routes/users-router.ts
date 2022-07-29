import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {usersService} from "../domain/user-service";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";


export const usersRouter = Router({})
export const loginValidation = body('login')
    .trim().exists().notEmpty().isLength({min: 3, max: 10}).withMessage('Login should be from 3 to 10 symbols')
export const passwordValidation = body('password')
    .trim().exists().notEmpty().isLength({min: 6, max: 20}).withMessage('Password should be from 6 to 20 symbols')


usersRouter.get('/', async (req: Request, res: Response) => {
    const pageNumber = req.query.PageNumber || 1;
    const pageSize = req.query.PageSize || 10;

    const users = await usersService.getUsers(+pageNumber, +pageSize)
    if (users) {
        res.status(200).send(users)
    } else {
        res.sendStatus(400)
    }
})
usersRouter.post('/',
    // loginValidation,
    // passwordValidation,
    // inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const createUser = await usersService.createUser(req.body.login, req.body.password)
        if(createUser) {
            res.status(201).send(createUser)
        } else {
            res.status(401)
        }
    })
usersRouter.delete('/:id', (req: Request, res: Response) => {

})