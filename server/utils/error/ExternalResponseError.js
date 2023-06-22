import ExtendableError from './ExtendableError';

class ExternalResponseError extends ExtendableError {
    constructor({ message, statusCode = 500, ...params }) {
        super(message);
        this.statusCode = statusCode;
        this.meta = params;
    }
}

export default ExternalResponseError;
