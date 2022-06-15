import {Request, Response, Router} from "express";


export const postsRouter = Router({})

let post = [
    {id: 0, title: "string", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"},
    {id: 1, title: "kyky", shortDescription: "string", content: "string", bloggerId: 1, bloggerName: "string"},
    {id: 2, title: "goodBye", shortDescription: "string", content: "string", bloggerId: 2, bloggerName: "string"},
]

postsRouter.get('/', (req: Request, res: Response) => {
    res.send(post)
    res.status(200)
})
postsRouter.post('/', (req: Request, res: Response) => {

})