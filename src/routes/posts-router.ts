import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-db-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {authMiddleware} from "../middleware/auth-middleware";
import {postsService} from "../domain/posts-service";


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
    const posts = await postsService.getPosts()
    res.status(201).send(posts)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = await postsService.getPostByID(id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPosts = await postsService.postPosts(
            title, shortDescription, content, bloggerId
        )
        if (newPosts) {
            if (typeof newPosts !== "boolean") {
                res.status(201).send({
                        id: newPosts.id,
                        title: newPosts.title,
                        shortDescription: newPosts.shortDescription,
                        content: newPosts.content,
                        bloggerId: newPosts.bloggerId,
                        bloggerName: newPosts.bloggerName
                    }
                )
            }
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
postsRouter.put('/:id',
    authMiddleware,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const {title, shortDescription, content, bloggerId} = req.body;
        const putPost = await postsService.putPost(id, title, shortDescription, content, bloggerId)
        const blogger = await bloggersRepository.getBloggerByID(bloggerId)
        if (!blogger) {
            return res.status(400)
                .send({
                    errorsMessages: [{
                        message: "Should be correct ID",
                        field: "bloggerId"
                    }],
                })
        }
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
postsRouter.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    const id = +req.params.id
    const isDel = await postsService.delPost(id)
    if (!isDel) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})