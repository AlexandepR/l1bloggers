import express, {Response, Request} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5001

let bloggers = [{id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"}]
let post = [{
    id: 0, title: "string", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"
}]
app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers)
    res.sendStatus(200)
})
app.get('/bloggers/:bloggersId', (req: Request, res: Response) => {
    const id = +req.params.bloggersId
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        res.send(blogger)
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})
app.post('/bloggers', (req: Request, res: Response) => {
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
app.put('/bloggers/:bloggersId', (req: Request, res:Response) => {
    const id = req.body.bloggerId;
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})