import { Button, TextButton } from '@goorm-dev/gds-components';
import { DownloadIcon } from '@goorm-dev/gds-icons';
import { toast } from '@goorm-dev/gds-toastify';
import JSZip from 'jszip';

import axios from 'axios';
import { useState } from 'react';

import cn from 'classnames';
import styles from './DownloadButton.module.scss';

/**
 *
 * @param {import('./DownloadButton.types').DownloadButtonProps} props
 * @returns
 */
const DownloadButton = ({
    filename = '',
    isText = false,
    href: defaultHref,
    color = 'basic',
    icon = <DownloadIcon />,
    iconSide = 'right',
    outline = true,
    className,
    children,
    onClick,
    ...props
}) => {
    const [{ href, isLoading }, setDownloadInfo] = useState({
        href: '',
        isLoading: false,
    });

    /**
     * a tag 활용해서 파일 다운로드하는 메서드
     * @param {string} convertedHref
     */
    const downloadFile = (convertedHref) => {
        const $downloadAnchor = document.createElement('a');
        $downloadAnchor.download = true;
        $downloadAnchor.href = convertedHref;
        $downloadAnchor.download = filename;
        $downloadAnchor.click();

        setDownloadInfo({
            href: convertedHref,
            isLoading: false,
        });
    };

    /**
     * 단일 파일 href를 생성하는 메서드
     * @param {string} currentHref
     */
    const createSingleHref = async (currentHref) => {
        const { data: blob } = await axios.get(currentHref, {
            responseType: 'blob',
        });

        return URL.createObjectURL(blob);
    };

    /**
     * 복수 파일 리스트를 zip파일 href로 생성하는 메서드
     * @param {import('./DownloadButton.types').AttachedFiles} hrefList
     */
    const createZipHref = async (hrefList) => {
        const zip = new JSZip();

        await Promise.all(
            hrefList.map(async ({ filename, url }) => {
                const { data: blob } = await axios.get(url, {
                    responseType: 'blob',
                });

                zip.file(filename, blob);

                return URL.createObjectURL(blob);
            }),
        );

        return URL.createObjectURL(
            await zip.generateAsync({
                type: 'blob',
            }),
        );
    };

    /** 여러 타입의 href를 컨버팅해주는 메서드 */
    const convertHrefToHrefList = () => {
        if (Array.isArray(defaultHref)) return defaultHref;
        if (typeof defaultHref === 'string') {
            return [{ filename, url: defaultHref }];
        }
        if (!!defaultHref.url && !!defaultHref.filename) {
            return [defaultHref];
        }

        throw new Error('지원하지 않는 href 타입입니다.');
    };

    /** 알맞은 href를 생성하는 메서드 */
    const createDownloadHref = async () => {
        setDownloadInfo({
            href,
            isLoading: true,
        });

        const hrefList = convertHrefToHrefList();

        if (hrefList.length === 0) {
            throw new Error(`
                href는 한개 이상 작성해주세요.
                ex-1) href="https://..."
                ex-3) href={{ filename: "1", url: "https://...1" }}
                ex-2) href={[{ filename: "1", url: "https://...1" }, { filename: "2", url: "https://...2" }]}
            `);
        }

        if (hrefList.length > 1) {
            return await createZipHref(hrefList);
        } else {
            return await createSingleHref(hrefList[0].url);
        }
    };

    /** 실질적인 다운로드 메서드 */
    const donwload = async () => {
        try {
            if (href) return downloadFile(href);

            const createdDownloadHref = await createDownloadHref();
            return downloadFile(createdDownloadHref);
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

    const ButtonComponent = isText ? TextButton : Button;
    const commonProps = {
        tag: 'a',
        download: true,
        color,
        icon,
        iconSide,
        outline,
        className: cn(styles.downloadButton, className),
        href: 'javascript:void(0);',
    };

    if (isLoading) {
        return (
            <ButtonComponent
                {...commonProps}
                {...props}
                /** onClick을 막기 위해 의도적으로 disabled 덮음 */
                disabled
            >
                파일 다운로드 중...
            </ButtonComponent>
        );
    }

    return (
        <ButtonComponent
            {...commonProps}
            {...props}
            onClick={(e) => {
                donwload();
                if (typeof onClick === 'function') onClick(e);
            }}
        >
            {children}
        </ButtonComponent>
    );
};
export default DownloadButton;
