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
        const createdBlogger = await bloggersRepository.postBlogger(newBlogger)
        return createdBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.putBlogger(id, name, youtubeUrl)
    },
    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    }
}