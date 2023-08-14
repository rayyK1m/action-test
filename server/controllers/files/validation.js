import Joi from 'joi';

const getPresignedUrl = {
    query: {
        pathType: Joi.valid('program', 'camp').required(),
        contentType: Joi.string().required(),
        fileType: Joi.valid('thumbnail', 'default').required(),
    },
};

export default { getPresignedUrl };
