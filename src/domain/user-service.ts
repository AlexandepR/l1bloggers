import {ResultType, UserDBType, usersRepository} from "../repositories/users-repository";
import {authService} from "./auth-servise";
import {ObjectId} from "mongodb";


export const usersService = {
    async getUsers(pageNumber: number, pageSize: number): Promise<ResultType<UserDBType[]>> {
        return usersRepository.getUsers(pageNumber, pageSize)
    },
    async createUser(login: string, password: string): Promise<UserDBType> {
        const passwordHash = await authService.generateHash(password)
        const user: UserDBType = {
            // _id: new ObjectId(),
            login,
            // passwordHash
        }
        return usersRepository.createUser(user)
    }
}