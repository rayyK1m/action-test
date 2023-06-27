import Layout from '@/components/Layout/Layout';
import axios from 'axios';

// NOTE: 사용법을 알려주기 위한 예시
const uploadFile = async (file) => {
    // presigned url 얻어오기
    const {
        data: { url, path },
    } = await axios.get('/api/files/presigned', {
        params: {
            pathType: 'program', // 사전에 약속된 업로드될 디렉토리 타입
            contentType: file.type,
        },
    });

    console.log({ url, path });

    // presigned url을 통한 S3 파일 업로드
    // aws에서 해당 버킷에 대해 cors 설정을 열어줘야함
    await axios.put(url, file, {
        headers: {
            'Content-Type': file.type,
        },
    });

    console.log('업로드 완료!');
};

export default function FileExamplePage() {
    const handleChange = async (e) => {
        await uploadFile(e.target.files[0]);
    };
    return (
        <Layout>
            <Layout.Main>
                <form>
                    <input type="file" onChange={handleChange} />
                </form>
            </Layout.Main>
        </Layout>
    );
}
