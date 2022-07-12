import {bloggersType, collectionBloggers} from "./db";

export let __bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]


export const bloggersRepository = {
    async getBloggers(name: string | null | undefined): Promise<bloggersType[]> {
        const filter: any = {}
        if (name) {
            filter.name = {$regex: name}
        }
        return collectionBloggers.find(filter).toArray()
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        let blogger: bloggersType | null = await collectionBloggers.findOne({id})
        return blogger
    },
    async postBlogger(name: string, youtubeUrl: string): Promise<bloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const blogger = await collectionBloggers.insertOne(newBlogger)
        // __bloggers.push(newBlogger)
        return newBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const updateBlogger = await collectionBloggers.updateOne({id: id}, {$set: {name: name, youtubeUrl: youtubeUrl}})
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
        const delBlogger = await collectionBloggers.deleteOne({id: id})
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