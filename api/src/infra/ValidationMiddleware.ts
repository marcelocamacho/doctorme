import {Request, Response, NextFunction} from 'express';
import {ObjectSchema} from 'joi';
import { BadRequestError } from '@/infra/helpers/Errors';
import { HttpStatusCode, responseErrorFormatter } from '@/infra/helpers/ErrorHandling';
import { decodeFromBase64 } from './helpers/SecurityHelper';
//validar o body da requisição
function validatePayload(schema: ObjectSchema, key: 'body'| 'params'){
    return(req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req[key]);
        if(error){
            const message = 'Invalid payload';
            return res.status(400).json({message, error: error.message});
        }
        next();
    }
}

//validar os parâmetros da requisição
export function validateBody(schema: ObjectSchema){
    return validatePayload(schema, 'body');
}

//validar a requisição
export function validateParams(schema: ObjectSchema){
    return validatePayload(schema, 'params');
}
//validar se o token da autenticação foi enviado
export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    if(!req.headers.authorization){
        const message = new BadRequestError('Missing authorization header');
        return res.status(HttpStatusCode.UNAUTHORIZED).json(responseErrorFormatter(message))
    }

    const token = req.headers.authorization.split(' ')[1];
    const user: any = decodeFromBase64(token);

    if(!user){
        const message = new BadRequestError('Invalid token');
        return res.status(HttpStatusCode.UNAUTHORIZED).json(responseErrorFormatter(message));
    }

    next();
}