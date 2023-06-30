import ExtendableError from './ExtendableError';

class ForbiddenError extends ExtendableError {
    constructor({ message, statusCode = 403, ...params }) {
        super(message);
        this.statusCode = statusCode;
        this.meta = params;
    }
}

export default ForbiddenError;
