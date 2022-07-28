import bcrypt from 'bcrypt'
/**
 *
 * @param login
 * @param password
 * */

export const authService = {
    async generateHash(password:string) {
        const hash = await bcrypt.hash(password, 10)
    }
}

