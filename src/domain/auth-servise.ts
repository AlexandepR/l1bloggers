import bcrypt from 'bcrypt'
/**
 *
 * @param login
 * @param password
 * */

export const authService = {
    async generateHash(password:string) {
        // const passwordSalt = await bcrypt.genSalt(10)
        // const passwordHash = await this._generateHash(password, passwordSalt)
        const hash = await bcrypt.hash(password, 10)

        return hash
    }
}

