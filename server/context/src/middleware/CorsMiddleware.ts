import { ENV } from "config/env";
import { Request, Response, NextFunction } from "express";

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, cache, x-app-token, x-app-name, Access-Control-Expose-Headers');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')
    next()
}
