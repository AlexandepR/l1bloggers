import express, {Response, Request, NextFunction} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5001

// const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
//
// }
// app.use(validatorMiddleware)


app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})