import {bloggersType, collectionBloggers} from "./db";

export let __bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]


export const bloggersRepository = {
    async getBloggers(name: string | null | undefined, pageNumber: number, pageSize: number): Promise<any> {
        const filter: any = {}
        if (name) {
            filter.name = {$regex: name}
        }
        // const pagesCount = 0;
        const totalCount = await collectionBloggers.count({});
        const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(await collectionBloggers.count({}) / pageSize)
        const newArray = await collectionBloggers.find(filter).skip(skip).limit(pageSize).toArray()
        const changeArray = newArray.map(obj=>({...obj, _id: name}))
        const result = {
        "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize":pageSize,
            "totalCount": totalCount,
            "items": changeArray
        }
        return result
        // return collectionBloggers.find(filter).skip(skip).limit(pageSize).toArray()
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        let blogger: bloggersType | null = await collectionBloggers.findOne({id})
        return blogger
    },
    async postBlogger(newBlogger: bloggersType): Promise<bloggersType> {
        const blogger = await collectionBloggers.insertOne(newBlogger)
        return newBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const updateBlogger = await collectionBloggers.updateOne(
            {id: id},
            {
                $set: {
                    name: name,
                    youtubeUrl: youtubeUrl
                }
            }
        )
        return updateBlogger.matchedCount === 1

    },
    async deleteBlogger(id: number): Promise<boolean> {
        const delBlogger = await collectionBloggers.deleteOne({id: id})
        return delBlogger.deletedCount === 1
    },
    async deleteBloggerAll(): Promise<boolean> {
        const delBlogger = await collectionBloggers.deleteMany({})
        return delBlogger.deletedCount >= 1
    }
}