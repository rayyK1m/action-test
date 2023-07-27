import { Button } from '@goorm-dev/gds-components';
import { toast } from '@goorm-dev/gds-toastify';

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

        try {
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
        } catch (error) {
            toast(
                <>
                    <span className="d-block">
                        파일 다운로드 중 오류가 발생했습니다.
                    </span>
                    <span className="d-block">
                        다운로드를 원하실 경우, contact@goorm.io로 문의해주세요.
                    </span>
                </>,
                {
                    type: toast.TYPE.ERROR,
                },
            );
            setDownloadInfo({
                href: '',
                isLoading: false,
            });
        }
    };

    if (isLoading) {
        return (
            <Button
                {...props}
                /** onClick을 막기 위해 의도적으로 disabled 덮음 */
                disabled
            >
                파일 다운로드 중...
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
