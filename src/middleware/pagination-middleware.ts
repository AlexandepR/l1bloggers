import {NextFunction, Request, Response} from "express";
import {bloggersService} from "../domain/bloggers-service";

type resultType = {
    next?: {page: number, limit: number}
    previous?: {page: number, limit: number}
    results?: any
}


export function paginatedResults(model: any) {
    return (req: Request, res: any, next: NextFunction) => {
        const pageNumber = parseInt(<string>req.query.PageNumber);
        const pageSize = parseInt(<string>req.query.PageSize);

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = pageNumber * pageSize;

        const results: resultType = {};
        if (endIndex < model.length) {
            results.next = {
                page: pageNumber + 1,
                limit: pageSize
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: pageNumber - 1,
                limit: pageSize
            };
        }

        results.results = model.slice(startIndex, endIndex);
        // res.json(results)
        res.paginatedResults = results;
        next();
    };
}