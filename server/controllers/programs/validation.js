import Joi from 'joi';

const getPrograms = {
    query: {
        page: Joi.number(),
        limit: Joi.number(),
        sort: Joi.string(),
        search: Joi.string().allow(''),
        campType: Joi.string(),
        category: Joi.string().allow(''),
        operateLocation: Joi.string().allow(''),
        institutionId: Joi.string(),
        active: Joi.boolean(),
    },
};

export default { getPrograms };
