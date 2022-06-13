import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5001

let videos = [
]
app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})