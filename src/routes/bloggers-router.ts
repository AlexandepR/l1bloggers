import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";


export const bloggersRouter = Router({})

// const nameValidator = body('name').trim().isLength ({
//     min: 0,
//     max: 15
// }).withMessage('Title length should be from 3 to 10 symbols')
// const youtubeUrlValidator = body('youtubeUrl').trim().isLength ({
//     min: 0,
//     max: 15
// }).withMessage('Title length should be from 3 to 10 symbols')


bloggersRouter.get('', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.getBloggers()
        res.send(bloggers)
        res.sendStatus(200)

})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const blogger = bloggersRepository.getBloggerByID(+req.params.id)
    if (blogger) {
        res.send(blogger)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})
bloggersRouter.post('/', (req: Request, res: Response) => {
    const newBlogger = bloggersRepository.postBlogger(req.body.name, req.body.youtubeUrl);
    // const url = /https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // if (!name || !youtubeUrl || typeof name !== 'string' || name.length > 15 ||
    //     typeof youtubeUrl !== 'string' || youtubeUrl.length > 100
    //     || !url.test(String(youtubeUrl).toLowerCase())
    // )
    if (!newBlogger) {
        res.sendStatus(400).send({
            errorsMessages: [{
                message: "string",
                field: 'string'
            }],
        })
        return
    } else {
        res.send(newBlogger)
        res.sendStatus(201)
    }
})
bloggersRouter.put('/:id', (req: Request, res: Response) => {
    const blogger = bloggersRepository.putBlogger(+req.params.id, req.body.name, req.body.youtubeUrl);

    // const url = /https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    // if (!bloggerNew || !name || !youtubeUrl || typeof name !== 'string' || name.length > 15 ||
    //     typeof youtubeUrl !== 'string' || youtubeUrl.length > 100
    //     || !url.test(String(youtubeUrl).toLowerCase()))
    if (!blogger) {
        res.sendStatus(404).send({
            errorsMessages: [{
                message: "string",
                field: "string"
            }],
        })
    } else if (!blogger) {
        res.sendStatus(400)
    } else {
        res.sendStatus(204);
    }
})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = bloggersRepository.deleteBlogger(+req.params.bloggerId);
    if (!isDeleted) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)

    }
})