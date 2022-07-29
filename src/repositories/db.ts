import {MongoClient, WithId} from 'mongodb'
import {UserDBType} from "./users-db-repository";
// import { WithId, ObjectId } from 'mongodb'


// interface pagination {
//     pagesCount: number,
//     page: number
// }
// interface bloggerWithPag extends pagination {
//     items: string
// }

// BloggerItemType
export type BloggersType = {
    // id: number
    name: string
    youtubeUrl: string
}
export type BloggerItemDBType = WithId<BloggersType>

// export type BloggersType = {
//     id: number
//     name: string
//     youtubeUrl: string
// }
export type PostsType = {
    _id?: number
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}
// export type UserType = {
//     id: string,
//     login: string
// }

// const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoUri = ('mongodb+srv://Alexandep:PyGSIcZUZ0llnWkK@cluster0.wcy2s6z.mongodb.net/allBloggers?retryWrites=true&w=majority')

const client = new MongoClient(mongoUri);
const db = client.db("allBloggers");
export const collectionBloggers = db.collection<BloggersType>("bloggers");
export const collectionPosts = db.collection<PostsType>("posts");
export const collectionUsers = db.collection<UserDBType>("users");

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