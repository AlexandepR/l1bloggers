import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {bloggersType} from "../repositories/db";


export const bloggersService = {
    async getBloggers(name: string | null | undefined): Promise<bloggersType[]> {
        return bloggersRepository.getBloggers(name)
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        return bloggersRepository.getBloggerByID(id)
    },
    async postBlogger(name: string, youtubeUrl: string): Promise<bloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        return await bloggersRepository.postBlogger(newBlogger)
        return newBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const updateBlogger = await collectionBloggers.updateOne({id: id}, { $set: {name: name, youtubeUrl: youtubeUrl}})
        return updateBlogger.matchedCount === 1
    },
    async deleteBlogger(id: number): Promise<boolean> {
        const delBlogger = await collectionBloggers.deleteOne({id: id})
        return delBlogger.deletedCount === 1
    }
}