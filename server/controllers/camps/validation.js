import Joi from 'joi';

const getCamps = {
    query: {
        programId: Joi.string(),
        institutionId: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    },
};

export default { getCamps };
