// NOTE: ncloud에서 aws-sdk를 지원하므로 accessKey등만 변경하여 사용 가능

import aws from 'aws-sdk';
import mime from 'mime';
import { v4 as uuidv4 } from 'uuid';

aws.config.update({
    accessKeyId: process.env.AWS_CONFIG_KEY_ID,
    secretAccessKey: process.env.AWS_CONFIG_ACCESS_KEY,
    region: process.env.AWS_CONFIG_REGION,
});

const PATH_TYPE = {
    PROGRAM: 'newsac/programs',
    INSTITUTION: 'newsac/institution',
};

const createPresignedUrl = async (pathType, contentType) => {
    const s3 = new aws.S3();

    const fileExtension = mime.getExtension(contentType);
    const path = `${
        PATH_TYPE[pathType.toUpperCase()]
    }/${uuidv4()}.${fileExtension}`;

    const params = {
        Bucket: process.env.AWS_CONFIG_BUCKET,
        Key: path,
        Expires: 300, // TODO: URL이 사용되는 시점에 따라 적절한 값으로 변경이 필요함
        ContentType: contentType,
    };
    const url = await s3.getSignedUrlPromise('putObject', params);
    return { url, path };
};

export default { PATH_TYPE, createPresignedUrl };
