import {bloggers} from "./bloggers-repository";

export let posts = [
    {id: 0, title: "string1", shortDescription: "string1", content: "string1", bloggerId: 0, bloggerName: "string1"},
    {id: 0, title: "string2", shortDescription: "string2", content: "string2", bloggerId: 1, bloggerName: "string2"},
]

export const postsRepository = {
    getPosts() {
        return posts
    },
    postPosts(title: string, shortDescription: string, content: string, bloggerId: number) {
        const blogger = bloggers.find( b => b.id === bloggerId)
        if (blogger) {
            const newPost = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: blogger.name
            }
            posts.push(newPost)
            return newPost
        } else {
        return false
        }
    },
    getPost(id: number) {
        const post = posts.find(p => p.id === id)
        return post
    },
    putPost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {

        const post = posts.find(p => p.id === id)
        if (post) {
            post.title = title,
                post.shortDescription = shortDescription,
                post.content = content,
                post.bloggerId = bloggerId
            return true
        } else {
            return false
        }
    },
    delPost(id: number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1)
                return true
            }
        }
        return false
    }
}