import {__bloggers} from "./bloggers-db-repository";
import {collectionPosts, postsType} from "./db";


export const postsRepository = {
    async getPosts(): Promise<postsType[]> {
        return collectionPosts.find().toArray()
    },
    async getPostByID(id: number): Promise<postsType | null> {
        let post: postsType | null = await collectionPosts.findOne({id})
        return post
    },
    async getBloggerPosts(bloggerId: number): Promise<postsType[] | null | postsType> {
        let posts: postsType[] | null | postsType = await collectionPosts.find({bloggerId}).toArray()
        return posts
    },
    async postPosts(newPost: postsType): Promise<postsType> {
        const post = await collectionPosts.insertOne(newPost)
        return newPost
    },
    async putPost(
        id: number,
        title: string,
        shortDescription: string,
        content: string,
        bloggerId: number
    ): Promise<boolean> {
        const isUpdatePost = await collectionPosts.updateOne(
            {id: id},
            {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId
                }
            }
        )
        return isUpdatePost.matchedCount === 1
    },
    async deletePost(id: number): Promise<boolean> {
        const delPost = await collectionPosts.deleteOne({id: id})
        return delPost.deletedCount === 1
    },
    async deleteAllPost(): Promise<boolean> {
        const delPost = await collectionPosts.deleteMany({})
        return delPost.deletedCount >= 1
    }
}