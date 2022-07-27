import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {bloggersType, postsType} from "../repositories/db";
import {postsRepository} from "../repositories/posts-db-repository";


export const bloggersService = {
    async getBloggers(name: string | null | undefined, pageNumber: number, pageSize: number): Promise<bloggersType[]> {
        return bloggersRepository.getBloggers(name, pageNumber, pageSize)
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        return bloggersRepository.getBloggerByID(id)
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<bloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const createdBlogger = await bloggersRepository.postBlogger(newBlogger)
        return createdBlogger
    },
    async createPostForBlogger(bloggerId: number, title: string,
                               shortDescription: string, content: string): Promise<postsType | boolean> {
        const blogger = await bloggersRepository.getBloggerByID(bloggerId)
        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: blogger.name
            }
            const createdPost = await postsRepository.postPosts(newPost)
            return createdPost
        } else return false
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.putBlogger(id, name, youtubeUrl)
    },
    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    },
    async deleteBloggerAll(): Promise<boolean> {
        return await bloggersRepository.deleteBloggerAll()
    }
}