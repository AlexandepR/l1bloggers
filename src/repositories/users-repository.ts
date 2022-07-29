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
export type UserDBType = {
    // _id: number | string
    login:string,
    // passwordHash: string
}

export const usersRepository =  {
    async getUsers(pageNumber: number, pageSize: number): Promise<ResultType<UserDBType[]>> {
    // async getUsers(pageNumber: number, pageSize: number): Promise<any> {
    const totalCount = await collectionUsers.countDocuments();
    const skip = (pageNumber - 1) * pageSize
        const pagesCount = Math.ceil(totalCount / pageSize)
        const newArray = await collectionUsers.find().skip(skip).limit(pageSize).toArray()
        const changeArray : UserDBType[] = newArray.map(({_id, ...obj}) => {return obj})
        const result = {
            "pagesCount": pagesCount,
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "items": changeArray
        }
        return result
    },
    async createUser(user: UserDBType): Promise<UserDBType> {
        const result = await collectionUsers.insertOne(user)
        return user
    }
}