import axios from 'axios';

const getPresignedUrl = async (query) => {
    const { file, pathType } = query;
    const {
        data: { url, path },
    } = await axios.get('/api/files/presigned', {
        params: {
            pathType, // 사전에 약속된 업로드될 디렉토리 타입
            contentType: file.type,
        },
    });

    return { url, path };
};

const uploadFile = async (query) => {
    const { url, file } = query;
    const data = await axios.put(url, file, {
        headers: {
            'Content-Type': file.type,
        },
    });
    return data;
};

const fileApis = {
    getPresignedUrl,
    uploadFile,
};

export default fileApis;
