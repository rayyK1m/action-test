import Joi from 'joi';

const getCamps = {
    query: {
        programId: Joi.string(),
        institutionId: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
    },
};

const postCampReport = {
    query: {
        id: Joi.string(),
        reportType: Joi.string(),
    },
};
export default { getCamps, postCampReport };
