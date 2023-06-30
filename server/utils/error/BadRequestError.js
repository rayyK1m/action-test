import ExtendableError from './ExtendableError';

class BadRequestError extends ExtendableError {
    constructor({ message, statusCode = 400, ...params }) {
        super(message);
        this.statusCode = statusCode;
        this.meta = params;
    }
}

export default BadRequestError;
