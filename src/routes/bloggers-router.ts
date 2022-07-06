import {NextFunction, Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authMiddleware} from "../middleware/auth-middleware";


export const bloggersRouter = Router({})


export const nameValidation = body('name')
    .trim().notEmpty().withMessage('Please fill in the field - name')
    .isLength({min: 0, max: 15}).withMessage('Title length should be from 0 to 15 symbols')

export const youtubeUrlValidator = body('youtubeUrl')
    .trim().notEmpty().withMessage('Please fill in the field - youtubeUrl')
    .matches("^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .withMessage('Please write correct URL')
    .isLength({min: 0, max: 100}).withMessage('Title length should be from 0 to 100 symbols')


bloggersRouter.get('', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.getBloggers()
    if (bloggers) {
        res.send(bloggers)
        res.send(200)
    } else (
        res.sendStatus(400)
    )

    //     res.sendStatus(201).send(bloggers)

})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const blogger = bloggersRepository.getBloggerByID(+req.params.id)
    if (blogger) {
        res.status(200).send(blogger)
    } else {
        res.sendStatus(404)
    }
})

bloggersRouter.post('/',authMiddleware, nameValidation, youtubeUrlValidator, inputValidationMiddleware, (req: Request, res: Response) => {
    const newBlogger = bloggersRepository.postBlogger(req.body.name, req.body.youtubeUrl);
    if (newBlogger) {
        res.status(201)
        res.send(newBlogger)
    } else (
        res.sendStatus(400)
    )
})

bloggersRouter.put('/:id', authMiddleware, nameValidation, youtubeUrlValidator, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const blogger = bloggersRepository.putBlogger(+req.params.id, req.body.name?.trim(), req.body.youtubeUrl?.trim());
        if (!blogger) {
            res.sendStatus(404).send({
                errorsMessages: [{
                    message: "string",
                    field: "string"
                }],
            })
        } else {
            res.sendStatus(204);
        }
    })

bloggersRouter.delete('/:id',authMiddleware, (req: Request, res: Response) => {
    const isDeleted = bloggersRepository.deleteBlogger(+req.params.id);
    if (!isDeleted) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)

    }
})