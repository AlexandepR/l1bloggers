let posts = [
    {id: 0, title: "string", shortDescription: "string", content: "string", bloggerId: 0, bloggerName: "string"},
    {id: 1, title: "kyky", shortDescription: "string", content: "string", bloggerId: 1, bloggerName: "string"},
    {id: 2, title: "goodBye", shortDescription: "string", content: "string", bloggerId: 2, bloggerName: "string"},
]

export const postsRepository = {
    getPosts() {
        return posts
    },
    postPosts(title: string, shortDescription: string, content: string, bloggerId: number) {
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: 'new'
        }
        posts.push(newPost)
        return newPost
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