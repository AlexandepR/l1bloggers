export let bloggers = [
    {id: 0, name: "Petya", youtubeUrl: "https://www.youtube.com/uOWp8HU"},
    {id: 1, name: "Vasya", youtubeUrl: "https://www.youtube.com/uO00tr"},
    {id: 2, name: "Katya", youtubeUrl: "https://www.youtube.com/ggttr"}
]
type bloggersType = {
    id: number
    name: string
    youtubeUrl: string
}

export const bloggersRepository = {
    async getBloggers(): Promise<bloggersType[]> {
    // async getBloggers(name: string | null | undefined): Promise<bloggersType[]> {
    //     if (name) {
    //         let filteredBloggers = bloggers.filter(b => b.name.indexOf(name) > -1)
    //         return filteredBloggers
    //     } else {
    //         return bloggers
    //     }
        return bloggers
    },
    async getBloggerByID(id: number): Promise<bloggersType | null> {
        const blogger = bloggers.find(b => b.id === id)
        if(blogger) {
            return blogger
        } else {
            return null
        }
    },
    async postBlogger(name: string, youtubeUrl: string): Promise<bloggersType> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    async putBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const blogger = bloggers.find(b => b.id === id)
        if (blogger) {
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return true
        } else {
            return false
        }
    },
    async deleteBlogger(id: number): Promise<boolean> {
        for (let i = 0; i < bloggers.length; i++) {
            if (bloggers[i].id === id) {
                bloggers.splice(i, 1)
                return true
            }
        }
        return false
    }
}