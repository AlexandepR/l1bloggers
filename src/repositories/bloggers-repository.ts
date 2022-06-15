let bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]

export const bloggersRepository = {
    getBloggers () {
        return bloggers
    },
    getBloggerByID (id: number) {
        const blogger = bloggers.find( b => b.id === id)
            return blogger
    },
    postBlogger (name: string, youtubeUrl: string) {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return bloggers
    },
    putBlogger (id: number, name: string, youtubeUrl: string) {
        const blogger = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return true
        } else {
            return false
        }
    },
    deleteBlogger (id: number) {
        for( let i = 0; i < bloggers.length; i++) {
            if ( bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true
            }
        }
        return false
    }
}