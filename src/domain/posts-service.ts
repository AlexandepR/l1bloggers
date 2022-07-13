import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {bloggersType, postsType} from "../repositories/db";
import {postsRepository} from "../repositories/posts-db-repository";


export const postsService = {
    async getPosts(): Promise<postsType[]> {
        return postsRepository.getPosts()
    },
    async getPostByID(id: number): Promise<postsType | null> {
        return postsRepository.getPostByID(id)
    },
    async postPosts(title: string, shortDescription: string, content: string, bloggerId: number): Promise<postsType | boolean> {
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
    }
}