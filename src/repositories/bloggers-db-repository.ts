import {bloggersType, collectionBloggers} from "./db";

export let __bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
]


export const bloggersRepository = {
    async getBloggers(pageNumber: number, pageSize: number, searchNameTerm: string | null): Promise<any | null>  {
        const filter: any = {}
        if (searchNameTerm) {
            filter.name = {$regex: searchNameTerm}
        }
        const totalCount: any = await collectionBloggers.countDocuments(filter);
        const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(totalCount / pageSize)
        // const newArray = await collectionBloggers.find(filter).skip(skip).limit(pageSize).toArray()
        const newArray = await collectionBloggers.find(filter, {projection:{_id: 0}}).skip(skip).limit(pageSize).toArray()
        // const changeArray = newArray.map(({_id, ...obj}) => {return obj;})
        const result = {
        "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize":pageSize,
            "totalCount": totalCount,
            // "items": changeArray
            "items": newArray
        }
        return result
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        // let blogger: bloggersType | null = await collectionBloggers.findOne({id})
        let blogger: bloggersType | null = await collectionBloggers.findOne({id}, {projection:{_id: 0}})
        return blogger
    },
    async postBlogger(newBlogger: bloggersType): Promise<bloggersType> {
        // const bloggerTypeDb = {
        //     _id: new ObjectId,
        //     ...newBlogger
        // }
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