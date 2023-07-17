import Link from 'next/link';
import cn from 'classnames';
import { Button } from '@goorm-dev/gds-components';
import styles from './LinkWithRole.module.scss';

/**
 *
 * @param {{ role: import('@/query-hooks/useSession').Role; channelUrl?: string }} props
 * @returns {JSX.Element}
 */
const LinkWithRole = ({ role, channelUrl, className }) => {
    const DEFAULT_PROPS = {
        className: cn(styles.container, className),
        tag: Link,
        color: 'link',
        size: 'lg',
    };

    switch (role) {
        case 'student':
        case 'teacher':
            return (
                <Button {...DEFAULT_PROPS} href="/applications">
                    신청 내역
                </Button>
            );
        case 'institution':
            return (
                <Button {...DEFAULT_PROPS} href="/institution/admin">
                    운영 기관 어드민
                </Button>
            );
        case 'foundation':
            return (
                <Button {...DEFAULT_PROPS} href="/foundation/admin">
                    재단 어드민
                </Button>
            );
        case 'channelAdmin':
            return (
                <Button
                    {...DEFAULT_PROPS}
                    tag="a"
                    href={new URL('/admin', channelUrl)}
                    target="_blank"
                >
                    채널 관리
                </Button>
            );

        default:
            return <></>;
    }
};

export default LinkWithRole;
