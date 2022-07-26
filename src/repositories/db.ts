import {MongoClient} from 'mongodb'

export type bloggersType = {
    id: number
    name: string
    youtubeUrl: string
}
export type postsType = {
    _id?: number
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}
export type userType = {
    id: string,
    login: string
}

// const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoUri = ('mongodb+srv://Alexandep:PyGSIcZUZ0llnWkK@cluster0.wcy2s6z.mongodb.net/allBloggers?retryWrites=true&w=majority')

const client = new MongoClient(mongoUri);
const db = client.db("allBloggers");
export const collectionBloggers = db.collection<bloggersType>("bloggers");
export const collectionPosts = db.collection<postsType>("posts");
export const collectionUsers = db.collection<userType>("users");

export async function runDb() {
        try {
            await client.connect();
            console.log('Connection created')
            await client.db("bloggers").command({ ping: 1});
            await client.db("posts").command({ ping: 1});
            await client.db("users").command({ ping: 1});
        } catch {
            console.log("Can't connect to db")
            await client.close();
        }
}