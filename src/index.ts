import express, {Response, Request, NextFunction} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {authMiddleware} from "./middleware/auth-middleware";

const app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(authMiddleware)
const port = process.env.PORT || 5001


app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})