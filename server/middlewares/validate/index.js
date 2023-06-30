import Joi from 'joi';
import pick from 'lodash/pick';

import BadRequestError from '@/server/utils/error/BadRequestError';

const defaultOptions = {
    convert: true,
    abortEarly: false,
};

const getRequestInfo = (req) => ({
    method: req.method,
    url: `${req.headers.host}${req.url}`,
    query: req.query,
    body: req.body,
    params: req.params,
});

export default (schema, options = defaultOptions) =>
    async (req, res, next) => {
        const validSchema = pick(schema, ['query', 'body', 'params']);
        const object = pick(req, Object.keys(validSchema));
        const { convert, abortEarly } = {
            ...defaultOptions,
            ...options,
        };

        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: 'key' }, abortEarly })
            .validate(object, { convert });

        if (error) {
            const errorMessage = error.details.map((details) =>
                details.message.replaceAll('"', ''),
            );

            throw new BadRequestError({
                message: 'validation error',
                validationError: errorMessage,
                requestInfo: getRequestInfo(req),
            });
        }

        Object.assign(req, value);
        return next();
    };
