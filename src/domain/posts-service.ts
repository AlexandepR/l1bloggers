import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {BloggersType, PostsType} from "../repositories/db";
import {postsBloggerType, postsRepository} from "../repositories/posts-db-repository";


export const postsService = {
    async getPosts(pageNumber: number, pageSize: number): Promise<postsBloggerType<PostsType[]>> {
        return postsRepository.getPosts(pageNumber, pageSize)
    },
    async getPostByID(id: number): Promise<PostsType | null> {
        return postsRepository.getPostByID(id)
    },
    async getBloggerPosts(bloggerId: number, pageSize: number, pageNumber: number): Promise<postsBloggerType<PostsType[]>> {
        return postsRepository.getBloggerPosts(bloggerId, pageSize, pageNumber)
    },
    async postPosts(title: string, shortDescription: string, content: string, bloggerId: number): Promise<PostsType | boolean> {
        const blogger = await bloggersRepository.getBloggerByID(bloggerId)
        if(blogger) {
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
    async putPost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise<boolean> {
        return await postsRepository.putPost(id, title, shortDescription, content, bloggerId)
    },
    async delPost(id: number): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },
    async delAllPost(): Promise<boolean> {
        return await postsRepository.deleteAllPost()
    }
}