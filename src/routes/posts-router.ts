import {Request, Response, Router} from "express";
import {postsDbRepository} from "../repositories/posts-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {authMiddleware} from "../middleware/auth-middleware";


export const postsRouter = Router({})
const titleValidation = body('title')
    .trim().exists().notEmpty().withMessage('Please fill in the field - Title')
    .isLength({min: 0, max: 30}).withMessage('Title length should be from 0 to 30 symbols')
const shortDescriptionValidation = body('shortDescription')
    .trim().exists().notEmpty().withMessage('Please fill in the field - shortDescription')
    .isLength({min: 0, max: 100}).withMessage('shortDescription length should be from 0 to 100 symbols')
const contentValidation = body('content')
    .trim().exists().notEmpty().withMessage('Please fill in the field - content')
    .isLength({min: 0, max: 1000}).withMessage('content length should be from 0 to 1000 symbols')

postsRouter.get('', async (req: Request, res: Response) => {
    const posts = await postsDbRepository.getPosts()
    res.send(posts)
    res.sendStatus(201)
})
postsRouter.post('',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPosts = await postsDbRepository.postPosts(title, shortDescription, content, bloggerId)
        if (newPosts) {
            res.status(201).send(newPosts)
        } else {
            res.status(400)
            .send({
                        errorsMessages: [{
                            message: "Should be correct ID",
                            field: "bloggerId"
                        }],
                    })
        }
    })
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = await postsDbRepository.getPost(id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.put('/:id',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const {title, shortDescription, content, bloggerId} = req.body;
        const putPost = await postsDbRepository.putPost(id, title, shortDescription, content, bloggerId)
        const blogger = await bloggersRepository.getBloggerByID(bloggerId)
        if (!blogger) {
            return res.status(400)
                .send({
                    errorsMessages: [{
                        message: "Should be correct ID",
                        field: "bloggerId"
                    }],
                })}
        if (putPost) {
            res.status(204).send(putPost)
        } else {
            res.sendStatus(404)
        }
        // else (
        //     res.sendStatus(400)
        // )
        // if (!putPost) {
        //     res.sendStatus(404).send({
        //         errorsMessages: [{
        //             message: "string",
        //             field: "string"
        //         }],
        //     })
        // } else {
        //     res.sendStatus(204);
        // }
    })
postsRouter.delete('/:id',authMiddleware, async (req: Request, res: Response) => {
    const id = +req.params.id
    const isDel = await postsDbRepository.delPost(id)
    if (!isDel) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})