import { IHandleError } from '../interfaces/IError';

export class ErrorHandler extends Error {
    private statusCode: number;

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const handleError = ({ err, res }: IHandleError) => {
    const { statusCode, message } = err;
    const errorResponse = {
        errors: {
            message: message.toString() || 'Internal server error',
        },
    };

    res.status(statusCode || 500);
    res.json(errorResponse);
};
