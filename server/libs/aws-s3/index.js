// NOTE: ncloud에서 aws-sdk를 지원하므로 accessKey등만 변경하여 사용 가능

import aws from 'aws-sdk';
import mime from 'mime';
import { v4 as uuidv4 } from 'uuid';

aws.config.update({
    accessKeyId: process.env.AWS_CONFIG_KEY_ID,
    secretAccessKey: process.env.AWS_CONFIG_ACCESS_KEY,
    sessionToken: process.env.AWS_CONFIG_SESSION_TOKEN,
    region: process.env.AWS_CONFIG_REGION,
});

// 기본 버킷, 이미지를 저장할 버킷
const DEFAULT_BUCKET = process.env.AWS_CONFIG_BUCKET;
const IMAGE_BUCKET = process.env.AWS_CONFIG_IMAGE_BUCKET;

const PRESIGNED_URL_EXPIRATION = 5; // 초

const PATH_TYPE = {
    PROGRAM: 'newsac/programs',
    CAMP: 'newsac/camp',
};

const BUCKET_TYPE = {
    thumbnail: IMAGE_BUCKET,
    default: DEFAULT_BUCKET,
};

/**
 * 파라미터에 따라 적절한 버킷과 경로를 선택하여 Presigned URL을 생성합니다.
 * 이미지와 이미지가 아닌 파일들에 대한 버킷을 구분합니다.
 * @param {string} bucketPathType - 버킷 경로 타입 ('program', 'institution')
 * @param {string} contentType - 파일의 컨텐츠 타입
 * @returns {Promise<{ url: string, path: string }>} - 생성된 Presigned URL과 경로
 */
const createPresignedUrl = async (pathType, contentType, fileType) => {
    const s3 = new aws.S3();

    const fileExtension = mime.getExtension(contentType);
    const path = `${
        PATH_TYPE[pathType.toUpperCase()]
    }/${uuidv4()}.${fileExtension}`;

    const bucket = BUCKET_TYPE[fileType];

    const params = {
        Bucket: bucket,
        Key: path,
        Expires: PRESIGNED_URL_EXPIRATION,
        ContentType: contentType,
    };
    const url = await s3.getSignedUrlPromise('putObject', params);
    return { url, path };
};

const createPresignedUrlWithPath = async (path) => {
    const s3 = new aws.S3();

    const params = {
        Bucket: DEFAULT_BUCKET,
        Key: path,
        Expires: PRESIGNED_URL_EXPIRATION,
    };
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
};

const awsS3Sdk = { PATH_TYPE, createPresignedUrl, createPresignedUrlWithPath };
export default awsS3Sdk;
