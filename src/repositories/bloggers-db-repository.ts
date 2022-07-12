// import {client} from "mongodb";

import {client} from "./db";
import {bloggers} from "./bloggers-memory-repository";

export let __bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]
type bloggersType = {
    id: number
    name: string
    youtubeUrl: string
}

export const bloggersRepository = {
    async getBloggers(): Promise<bloggersType[]> {

        // async getBloggers(name: string | null | undefined): Promise<bloggersType[]> {
        //     if (name) {
        //         let filteredBloggers = bloggers.filter(b => b.name.indexOf(name) > -1)
        //         return filteredBloggers
        //     } else {
        //         return bloggers
        //     }
        return client.db("allBloggers").collection<bloggersType>("bloggers").find({}).toArray()
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        // const blogger = __bloggers.find(b => b.id === id)
        let blogger: bloggersType | null =
            await client.db("allBloggers").collection<bloggersType>("bloggers").findOne({id})
        if(blogger) {
            return blogger
        } else {
            return null
        }
    },
    async postBlogger(name: string, youtubeUrl: string): Promise<bloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const blogger = await client.db("allBloggers").collection<bloggersType>("bloggers").insertOne(newBlogger)
        // __bloggers.push(newBlogger)
        return newBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const updateBlogger = await client.db("allBloggers").collection<bloggersType>("bloggers").updateOne({id: id}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return updateBlogger.matchedCount === 1
        // const blogger = __bloggers.find(b => b.id === id)
        // if (blogger) {
        //     blogger.name = name;
        //     blogger.youtubeUrl = youtubeUrl;
        //     return true
        // } else {
        //     return false
        // }
    },
    async deleteBlogger(id: number): Promise<boolean> {
        const delBlogger = await client.db("allBloggers").collection<bloggersType>("bloggers").deleteOne({id: id})
        return delBlogger.deletedCount === 1
        // for (let i = 0; i < __bloggers.length; i++) {
        //     if (__bloggers[i].id === id) {
        //         __bloggers.splice(i, 1)
        //         return true
        //     }
        // }
        // return false
    }
}