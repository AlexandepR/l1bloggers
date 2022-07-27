import {userType} from "../repositories/db";
import {usersRepository} from "../repositories/users-repository";


export const usersService = {
    async getUsers(pageNumber: number, pageSize: number): Promise<{ pagesCount: number }> {
       return usersRepository.getUsers(pageNumber, pageSize)
    }
}