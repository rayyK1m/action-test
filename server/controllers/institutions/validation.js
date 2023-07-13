import Joi from 'joi';

const getInstitutions = {
    query: {
        page: Joi.number(),
        limit: Joi.number(),
        search: Joi.string().allow(''),
        active: Joi.boolean(),
    },
};

export default { getInstitutions };
