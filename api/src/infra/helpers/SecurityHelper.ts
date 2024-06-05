import bcrypt from 'bcryptjs';

export function hashPassword(password:string){
    const SALT = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,SALT);
}

export function comparePassword(password: string, hash: string){
    return bcrypt.compareSync(password,hash);
}

export function encodeToBase64(data: string){
    return Buffer.from(data,'utf-8').toString('base64');
}

export function decodeFromBase64(data: string){
    return Buffer.from(data, 'base64').toString('utf-8')
}