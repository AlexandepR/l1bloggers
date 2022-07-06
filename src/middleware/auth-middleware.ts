import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {youtubeUrlValidator} from "../routes/bloggers-router";

const auth = {
    login: 'admin', password: 'qwerty'
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
       return  next()
    }
     else {
        res.status(401).send('Authorization error')
    }
}


// var user = auth(req);
//
// if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
//     res.writeHead(401, 'Access invalid for user', {'Content-Type' : 'text/plain'});
//     res.end('Invalid credentials');
// } else {
//     next();
// }
// });