import {__bloggers} from "./bloggers-db-repository";
import {collectionPosts, postsType} from "./db";
export type postsBloggerType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items : postsType[] | void
}

export const postsRepository = {
    async getPosts(): Promise<postsType[]> {
        return collectionPosts.find().toArray()
    },
    async getPostByID(id: number): Promise<postsType | null> {
        let post: postsType | null = await collectionPosts.findOne({id})
        return post
    },
    async getBloggerPosts(bloggerId: number, pageSize: number, pageNumber: number): Promise<postsType[] | null | postsType | postsBloggerType> {
        const totalCount = await collectionPosts.count({bloggerId})
        const pagesCount = Math.ceil(totalCount / pageSize)
        // const pageSize = pageSize;
        let posts: postsType[] | null | postsType = await collectionPosts.find({bloggerId}).toArray()
        const postsBlogger:postsBloggerType = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            // items : posts.map(obj => ({...obj, delete obj.id}))
            items: posts.map(({_id, ...obj}) => {return obj;})
        }
        return postsBlogger
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