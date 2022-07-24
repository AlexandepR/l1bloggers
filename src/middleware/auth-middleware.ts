import {NextFunction, Request, Response} from "express";


const auth = {
    login: 'admin', password: 'qwerty'
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    const isBasic64 = (req.headers.authorization || '').split(' ')[0]
    if (login && password && login === auth.login && password === auth.password && isBasic64 === 'Basic') {
       return  next()
    }
     else {
        res.status(401).send('Authorization error')
    }
}




