import express from 'express'
import bodyParser from "body-parser";
import {runDb} from './repositories/db'
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {usersRouter} from "./routes/users-router";

const app = express()

const jsonBodyMiddleWare = bodyParser.json()
app.use(jsonBodyMiddleWare)

const port = process.env.PORT || 5001

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port: ${port}`)
    })
}
startApp()

// const app = express()
// app.use(cors())
// app.use(bodyParser.json())
// const port = process.env.PORT || 5001
//
//
// app.use('/bloggers', bloggersRouter)
// app.use('/posts', postsRouter)
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })