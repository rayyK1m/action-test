import awsS3Sdk from '@/server/libs/aws-s3';
import validation from './validation';

const getPresignedUrl = async (req, res) => {
    const { pathType, contentType, fileType } = req.query;
    const { url, path } = await awsS3Sdk.createPresignedUrl(
        pathType,
        contentType,
        fileType,
    );
    return res.json({ url, path });
};

const getPresignedUrlWithPath = async (req, res) => {
    const { path } = req.query;
    const url = await awsS3Sdk.createPresignedUrlWithPath(
        decodeURIComponent(path),
    );

    return res.json(url);
};

const filesCtrl = { validation, getPresignedUrl, getPresignedUrlWithPath };
export default filesCtrl;
