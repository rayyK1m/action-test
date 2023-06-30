import Joi from 'joi';

const getPresignedUrl = {
    query: {
        pathType: Joi.valid('program', 'institution').required(),
        contentType: Joi.string().required(),
    },
};

export default { getPresignedUrl };
