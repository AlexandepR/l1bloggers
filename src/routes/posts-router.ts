import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {body} from "express-validator";


export const postsRouter = Router({})
    const titleValidation = body('title')
        .trim().exists().notEmpty().withMessage('Please fill in the field - Title')
        .isLength({min: 0 , max: 30}).withMessage('Title length should be from 0 to 30 symbols')
    const shortDescriptionValidation = body('shortDescription')
        .trim().exists().notEmpty().withMessage('Please fill in the field - shortDescription')
        .isLength({min: 0, max: 100}).withMessage('shortDescription length should be from 0 to 100 symbols')
    const contentValidation = body('content')
        .trim().exists().notEmpty().withMessage('Please fill in the field - content')
        .isLength({min: 0, max: 1000}).withMessage('content length should be from 0 to 1000 symbols')

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.send(posts)
    res.sendStatus(200)
})
postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    (req: Request, res: Response) => {
    const {title, shortDescription, content, bloggerId} = req.body
    const newPosts = postsRepository.postPosts(title, shortDescription, content, bloggerId)
        if(title && shortDescription && content && bloggerId) {
            res.status(201).send(newPosts)
        }
            res.sendStatus(400)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const post = postsRepository.getPost(id)
    if (post) {
        res.status(201).send(post)
    } else {
        res.sendStatus(404)
    }
})
postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation, (req: Request, res: Response) => {
    const id = +req.params.id;
    const {title, shortDescription, content, bloggerId} = req.body;
    const putPost = postsRepository.putPost(id, title, shortDescription, content, bloggerId)

    if (!putPost) {
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
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const isDel = postsRepository.delPost(id)
    if (!isDel) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})