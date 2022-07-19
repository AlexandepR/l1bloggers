import {NextFunction, Request, Response, Router} from "express";
import {bloggersService} from "../domain/bloggers-service";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {authMiddleware} from "../middleware/auth-middleware";
import {postsService} from "../domain/posts-service";


export const bloggersRouter = Router({})

export const nameValidation = body('name')
    .trim().notEmpty().withMessage('Please fill in the field - name')
    .isLength({min: 0, max: 15}).withMessage('Title length should be from 0 to 15 symbols')

export const youtubeUrlValidator = body('youtubeUrl')
    .trim().notEmpty().withMessage('Please fill in the field - youtubeUrl')
    .matches("^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .withMessage('Please write correct URL')
    .isLength({min: 0, max: 100}).withMessage('Title length should be from 0 to 100 symbols')


bloggersRouter.get('', async (req: Request, res: Response) => {

    const pageSize: number = parseInt(req.query.pageSize as string) || 10;
    const pageNumber: number = parseInt(req.query.pageNumber as string) || 1;

    const bloggers = await bloggersService.getBloggers(req.query.name?.toString(), pageNumber, pageSize)
    if (bloggers) {
        res.send(bloggers)
        res.status(200)
    } else (
        res.sendStatus(400)
    )
})

bloggersRouter.get('/:id', async (req: Request, res: Response) => {
    const blogger = await bloggersService.getBloggerByID(+req.params.id)
    if (blogger) {
        res.status(200).send(blogger)
    } else {
        res.sendStatus(404)
    }
})
bloggersRouter.get('/:bloggerId/posts', async (req: Request, res: Response) => {
    const blogger = await bloggersService.getBloggerByID(+req.params.bloggerId)
    if (blogger) {
        const bloggerPosts = await postsService.getBloggerPosts(+req.params.bloggerId)
        if (bloggerPosts) {
            res.status(200).send(bloggerPosts)
        } else {
            res.sendStatus(404)
        }
    }else {
        res.sendStatus(404)
    }
})

bloggersRouter.post('/', authMiddleware, nameValidation, youtubeUrlValidator, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newBlogger = await bloggersService.createBlogger(req.body.name, req.body.youtubeUrl);
        if (newBlogger) {
            res.status(201)
            res.send(newBlogger)
        } else (
            res.sendStatus(400)
        )
    })
bloggersRouter.post('/:bloggerId/posts',
    authMiddleware, nameValidation, youtubeUrlValidator, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content} = req.body
        // const newPosts = await postsService.postPosts(
        //     title, shortDescription, content, bloggerId
        // )
        const bloggerId = +req.params.bloggerId
        const newPostForBlogger = await bloggersService.createPostForBlogger(
            bloggerId, title, shortDescription, content)
        if (newPostForBlogger) {
            res.status(201).send(newPostForBlogger)
        }
    }
    )

bloggersRouter.put('/:id', authMiddleware, nameValidation, youtubeUrlValidator, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const blogger = await bloggersService.getBloggerByID(+req.params.id)
        if(blogger) {
        const isUpdate = await bloggersService.putBlogger(+req.params.id, req.body.name?.trim(), req.body.youtubeUrl?.trim());
        if (isUpdate) {

            // res.status(204).send(blogger)
            res.send(blogger)
        } } else {
            res.sendStatus(404)
            // res.status(404).send({
            //     errorsMessages: [{
            //         message: "string",
            //         field: "string"
            //     }],
            // })
        }
    })
bloggersRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await bloggersService.deleteBlogger(+req.params.id);
    if (!isDeleted) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)

    }
})