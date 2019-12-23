import { Response } from 'express';

export interface IHandleError {
    err: IError;
    res: Response;
}

export interface IError {
    statusCode: number;
    message: string;
}
