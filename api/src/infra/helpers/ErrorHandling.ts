import {Request, Response, NextFunction} from 'express';
import '@/infra/helpers/Errors';
import { BusinessError, NotFoundError, UnauthorizedError } from '@/infra/helpers/Errors';

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
};

export const errorHandling = (error: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = HttpStatusCode.OK;
    
    if(error instanceof NotFoundError) statusCode = HttpStatusCode.NOT_FOUND;
    if(error instanceof UnauthorizedError) statusCode = HttpStatusCode.UNAUTHORIZED;
    if(error instanceof BusinessError) statusCode = HttpStatusCode.UNPROCESSABLE_ENTITY;

    return res.status(statusCode).json(responseErrorFormatter(error));
}

export function responseErrorFormatter(error: Error){
    return{
        name: error.name,
        message: error.message
    };
}