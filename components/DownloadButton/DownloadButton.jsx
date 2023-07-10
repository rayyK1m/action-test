import { Button } from '@goorm-dev/gds-components';
import axios from 'axios';
import { useState } from 'react';

const DownloadButton = ({ href: defaultHref, children, onClick, ...props }) => {
    const [{ href, isLoading }, setDownloadInfo] = useState({
        href: '',
        isLoading: false,
    });

    const donwload = async () => {
        const $downloadAnchor = document.createElement('a');
        $downloadAnchor.download = true;

        if (href) {
            $downloadAnchor.href = href;
            $downloadAnchor.click();
            return;
        }

        setDownloadInfo({
            href,
            isLoading: true,
        });

        const { data: blob } = await axios.get(defaultHref, {
            responseType: 'blob',
        });

        const downloadHref = URL.createObjectURL(blob);
        $downloadAnchor.href = downloadHref;
        $downloadAnchor.click();

        setDownloadInfo({
            href: downloadHref,
            isLoading: false,
        });
    };

    if (isLoading) {
        return (
            <Button
                {...props}
                /** onClick을 막기 위해 의도적으로 disabled 덮음 */
                disabled
            >
                파일 로드 중...
            </Button>
        );
    }

    return (
        <Button
            onClick={(e) => {
                donwload();
                if (typeof onClick === 'function') onClick(e);
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
export default DownloadButton;
