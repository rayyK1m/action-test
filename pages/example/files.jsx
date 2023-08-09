import Layout from '@/components/Layout/Layout';
import axios from 'axios';
import toast from '@goorm-dev/gds-toastify';

// NOTE: 사용법을 알려주기 위한 예시
const getUrl = async (path) => {
    // presigned url 얻어오기
    const { data: url } = await axios.get('/api/files/download', {
        params: {
            path: encodeURIComponent(path), // 사전에 약속된 업로드될 디렉토리 타입
        },
    });
    return url;
};

export default function FileExamplePage() {
    const path = 'newsac/programs/19ebb6f0-b096-487d-9d7a-063127998092.csv';

    const handleClick = async () => {
        const url = await getUrl(path);

        try {
            const $downloadAnchor = document.createElement('a');
            // NOTE : db 상에 저장되어 있는 fileName으로 저장되도록 변경해서 사용하도록 변경
            $downloadAnchor.download = 'fileName';

            const { data: blob } = await axios.get(url, {
                responseType: 'blob',
            });

            const downloadHref = URL.createObjectURL(blob);
            $downloadAnchor.href = downloadHref;
            $downloadAnchor.click();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <Layout.Main>
                <button onClick={handleClick}>다운로드</button>
            </Layout.Main>
        </Layout>
    );
}
