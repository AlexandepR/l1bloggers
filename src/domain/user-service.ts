import {UserType} from "../repositories/db";
import {resultType, usersRepository} from "../repositories/users-repository";


export const usersService = {
    async getUsers(pageNumber: number, pageSize: number): Promise<resultType<UserType[]>> {
       return usersRepository.getUsers(pageNumber, pageSize)
    },
    async createService(login: string, password: string): Promise<any> {
        return usersRepository.createUser(login, password)
    }
}