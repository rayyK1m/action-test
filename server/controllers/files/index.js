import awsS3Sdk from '@/server/libs/aws-s3';
import validation from './validation';

const getPresignedUrl = async (req, res) => {
    const { pathType, contentType } = req.query;
    //console.log(pathType, contentType);
    const { url, path } = await awsS3Sdk.createPresignedUrl(
        pathType,
        contentType,
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
