import {NextFunction, Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";


export const bloggersRouter = Router({})


const nameValidation = body('name')
    .exists().trim().notEmpty().withMessage('Please fill in the field - Name')
    .isLength({min: 0, max: 15}).withMessage('Title length should be from 0 to 15 symbols')

const youtubeUrlValidator = body('youtubeUrl')
    .exists().trim().notEmpty().withMessage('Please fill in the field - youtubeUrl')
    .matches("^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .withMessage('Please write correct URL')
    .isLength({ min: 0, max: 100}).withMessage('Title length should be from 0 to 100 symbols')


bloggersRouter.get('', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.getBloggers()
    res.send(bloggers)
    res.sendStatus(200)

})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const blogger = bloggersRepository.getBloggerByID(+req.params.id)
    if (blogger) {
        res.send(blogger)
        res.sendStatus(201)
    } else {
        res.sendStatus(404)
    }
})

bloggersRouter.post('/', nameValidation, youtubeUrlValidator, inputValidationMiddleware, (req: Request, res: Response) => {
        const newBlogger = bloggersRepository.postBlogger(req.body.name, req.body.youtubeUrl);
            res.send(newBlogger)
            res.sendStatus(201)
    })
bloggersRouter.put('/:id', nameValidation, youtubeUrlValidator, inputValidationMiddleware,
    (req: Request, res: Response) => {
    const blogger = bloggersRepository.putBlogger(+req.params.id, req.body.name?.trim(), req.body.youtubeUrl?.trim());
    if (!blogger) {
        res.sendStatus(404).send({
            errorsMessages: [{
                message: "string",
                field: "string"
            }],
        })
    }  else {
        res.sendStatus(204);
    }
})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = bloggersRepository.deleteBlogger(+req.params.id);
    if (!isDeleted) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)

    }
})