import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body, param} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";
import {bloggers, bloggersRepository} from "../repositories/bloggers-repository";


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
// const bloggerIdValidation = param('id', 'invalid id')
//     .toInt()
//     .custom(id => bloggersRepository.getBloggerByID(id))

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.send(posts)
    res.sendStatus(201)
})
postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const {title, shortDescription, content, bloggerId} = req.body
        const newPosts = postsRepository.postPosts(title, shortDescription, content, bloggerId)
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
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = postsRepository.getPost(id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const id = +req.params.id;
        const {title, shortDescription, content, bloggerId} = req.body;
        const putPost = postsRepository.putPost(id, title, shortDescription, content, bloggerId)
        const blogger = bloggersRepository.getBloggerByID(bloggerId)
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
            res.status(404)
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
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const isDel = postsRepository.delPost(id)
    if (!isDel) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})