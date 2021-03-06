import {bloggersDataType, bloggersRepository} from "../repositories/bloggers-db-repository";
import {BloggersType, PostsType} from "../repositories/db";
import {postsRepository} from "../repositories/posts-db-repository";
import {ObjectId} from "mongodb";


export const bloggersService = {
    async getBloggers(pageNumber: number, pageSize: number, searchNameTerm: string | null): Promise<bloggersDataType<BloggersType[]>> {
        const bloggers = bloggersRepository.getBloggers(pageNumber, pageSize, searchNameTerm)
        return bloggers
    },
    async getBloggerByID(id: number): Promise<BloggersType | null> {
        return bloggersRepository.getBloggerByID(id)
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggersType> {
        // const newId = new ObjectId()
        // console.log( typeof (newId))
        const newBlogger = {
            // _id: +new ObjectId().toString,
            // id: +(new Date()),
            name,
            youtubeUrl
        }
        const createdBlogger = await bloggersRepository.createBlogger(newBlogger)
        return createdBlogger
    },
    async createPostForBlogger(bloggerId: number, title: string,
                               shortDescription: string, content: string): Promise<PostsType | boolean> {
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