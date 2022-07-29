import {collectionBloggers, collectionPosts, PostsType} from "./db";

export type postsBloggerType<T> = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T
}

export const postsRepository = {
    async getPosts(pageNumber: number, pageSize: number): Promise<postsBloggerType<PostsType[]>> {
        const totalCount = await collectionPosts.count({});
        const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(await collectionPosts.count({}) / pageSize)
        const newArray = await collectionPosts.find().skip(skip).limit(pageSize).toArray()
        const changeArray = newArray.map(({_id, ...obj}) => {
            return obj;
        })
        const result = {
            "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "items": changeArray
        }
        return result
    },
    async getPostByID(id: number): Promise<PostsType | null> {
        let post: PostsType | null = await collectionPosts.findOne({id})
        return post
    },
    async getBloggerPosts(bloggerId: number, pageSize: number, pageNumber: number): Promise<postsBloggerType<PostsType[]>> {
        const totalCount = await collectionPosts.count({bloggerId})
        const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(+totalCount / pageSize)
        let posts: PostsType[] | null | PostsType = await collectionPosts.find({bloggerId}).skip(skip).limit(pageSize).toArray()
        const result = posts.map(({_id, ...obj}) => {
            return obj;
        })
        const postsBlogger: postsBloggerType<PostsType[]> = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: result
        }
        return postsBlogger
    },
    async postPosts(newPost: PostsType): Promise<PostsType> {
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