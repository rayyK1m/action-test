import { withSessionRoute } from '@/server/utils/auth';
import awsS3Sdk from '@/server/libs/aws-s3';

const getPresignedUrl = async (req, res) => {
    // TODO: validate 추가 필요
    const { pathType, contentType } = req.query;
    const { url, path } = await awsS3Sdk.createPresignedUrl(
        pathType,
        contentType,
    );
    return res.json({ url, path });
};

export default { getPresignedUrl };
