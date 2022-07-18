import {NextFunction, Request, Response} from "express";

type resultType = {
    next?: {page: number, limit: number}
    previous?: {page: number, limit: number}
    results?: any
}

function paginatedResults(model: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(<string>req.query.page);
        const limit = parseInt(<string>req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results: resultType = {};
        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.results = model.slice(startIndex, endIndex);

        res.paginatedResults = results;
        next();
    };
}