import Joi from 'joi';

const getCamps = {
    query: {
        programId: Joi.string(),
        institutionId: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
        sort: Joi.string(),
        division: Joi.string(),
    },
};

const copyCamp = {
    query: {
        id: Joi.string(),
        institutionId: Joi.string(),
    },
};

const deleteCamps = {
    query: {
        campIds: Joi.string(),
        institutionId: Joi.string(),
    },
};

const postCampReport = {
    query: {
        id: Joi.string(),
        reportType: Joi.string(),
    },
};

export default { getCamps, postCampReport, copyCamp, deleteCamps };
