import {collectionUsers} from "./db";
import {authService} from "../domain/auth-servise";
import { WithId, ObjectId } from 'mongodb'

export type ResultType<T> = {
    "pagesCount": number
    "page": number
    "pageSize": number
    "totalCount": number
    "items": T
}
// export type UserDBType = WithId<{
//     login: string
// }>
export type UserDBType = WithId<{

    login: string
}>

export const usersDbRepository =  {
    async getAllUsers(pageNumber: number, pageSize: number): Promise<ResultType<UserDBType[]>> {
    // async getUsers(pageNumber: number, pageSize: number): Promise<any> {
    const totalCount = await collectionUsers.countDocuments();
    const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(totalCount / pageSize)
        const newArray = await collectionUsers.find().skip(skip).limit(pageSize).toArray()
        const changeArray = newArray.map(({_id, ...obj}) => {return obj})
        // const changeArray = newArray.map(u => ({id: u._id, login: u.login}))
        // const newId = new ObjectId()
        // console.log( typeof (newId))
        const result = {
            "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "items": newArray
        }
        return result
    },
    async createUser(user: UserDBType): Promise<UserDBType> {
        const result = await collectionUsers.insertOne(user)
        return user
    }
}