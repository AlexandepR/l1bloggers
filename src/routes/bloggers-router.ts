import {Request, Response, Router} from "express";


export const bloggersRouter = Router({})

let bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]


bloggersRouter.get('', (req: Request, res: Response) => {
    res.send(bloggers)
    res.sendStatus(200)
})
bloggersRouter.get('/:bloggersId', (req: Request, res: Response) => {
    const id = +req.params.bloggersId
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        res.send(blogger)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})
bloggersRouter.post('', (req: Request, res: Response) => {
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const url = /https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (!name || !youtubeUrl || typeof name !== 'string' || name.length > 15 ||
        typeof youtubeUrl !== 'string' || youtubeUrl.length > 100
        || !url.test(String(youtubeUrl).toLowerCase())
    ) {
        res.sendStatus(400).send({
            errorsMessages: [{
                message: "string",
                field: 'string'
            }],
        })
        return
    } else {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        res.send(bloggers)
        res.sendStatus(201)
    }
})
bloggersRouter.put('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId;
    const name = req.body.name;
    const youtubeUrl = req.body.youtubeUrl;
    const bloggerNew = bloggers.find(b => b.id === id)
    const url = /https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (!bloggerNew || !name || !youtubeUrl || typeof name !== 'string' || name.length > 15 ||
        typeof youtubeUrl !== 'string' || youtubeUrl.length > 100
        || !url.test(String(youtubeUrl).toLowerCase())) {
        res.sendStatus(404).send({
            errorsMessages: [{
                message: "string",
                field: "string"
            }],
        })
    } else if (!bloggerNew) {
        res.sendStatus(400)
    } else {
        bloggerNew.name = name;
        bloggerNew.youtubeUrl = youtubeUrl;
        res.sendStatus(204);
    }
})
bloggersRouter.delete('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId;
    if (!id) {
        res.sendStatus(404)
    }
    for (let i = 0; i < bloggers.length; i++) {
        if (bloggers[i].id === id) {
            bloggers.splice(i, 1)
            res.sendStatus(204)
        }
    }
})