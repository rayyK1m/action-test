import awsS3Sdk from '@/server/libs/aws-s3';
import validation from './validation';

const getPresignedUrl = async (req, res) => {
    const { pathType, contentType } = req.query;
    const { url, path } = await awsS3Sdk.createPresignedUrl(
        pathType,
        contentType,
    );
    return res.json({ url, path });
};

export default { validation, getPresignedUrl };
