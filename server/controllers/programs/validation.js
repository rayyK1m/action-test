import Joi from 'joi';

const getPrograms = {
    query: {
        page: Joi.number(),
        limit: Joi.number(),
        search: Joi.string().allow(''),
        category: Joi.string().allow(''),
        operateLocation: Joi.string().allow(''),
        campType: Joi.string(),
        institutionId: Joi.string(),
        active: Joi.boolean(),
    },
};

export default { getPrograms };
