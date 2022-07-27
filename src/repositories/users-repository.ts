import {collectionUsers, userType} from "./db";

type resultType = {
    "pagesCount": number
    "page": number
    "pageSize": number
    "totalCount": number
    "items": userType
}

export const usersRepository =  {
    async getUsers(pageNumber: number, pageSize: number): Promise<{ pagesCount: number }> {
    const totalCount: any = await collectionUsers.countDocuments();
    const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(totalCount / pageSize)
        const newArray = await collectionUsers.find().skip(skip).limit(pageSize).toArray()
        const changeArray = newArray.map(({_id, ...obj}) => {return obj})
        const result = {
            "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "items": changeArray
        }
        return result
    },
}