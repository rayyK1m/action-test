import ExtendableError from './ExtendableError';

class UnauthorizedError extends ExtendableError {
    constructor({ message, statusCode = 401, ...params }) {
        super(message);
        this.statusCode = statusCode;
        this.meta = params;
    }
}

export default UnauthorizedError;
