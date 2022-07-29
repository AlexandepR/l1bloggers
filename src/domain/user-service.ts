import {ResultType, UserDBType, usersDbRepository} from "../repositories/users-db-repository";
import {authService} from "./auth-servise";
import {ObjectId} from "mongodb";


export const usersService = {
    async getUsers(pageNumber: number, pageSize: number): Promise<ResultType<UserDBType[]>> {
        return usersDbRepository.getAllUsers(pageNumber, pageSize)
    },
    async createUser(login: string, password: string): Promise<UserDBType> {
        const passwordHash = await authService.generateHash(password)
        const user: UserDBType = {
            _id: new ObjectId(),
            login,
            // passwordHash
        }
        return usersDbRepository.createUser(user)
    }
}