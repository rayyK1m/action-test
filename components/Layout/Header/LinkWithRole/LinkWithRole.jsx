import Link from 'next/link';
import cn from 'classnames';
import { Button } from '@goorm-dev/gds-components';
import styles from './LinkWithRole.module.scss';
import { useRouter } from 'next/router';
import { ROLE } from '@/constants/db';

/**
 *
 * @param {{ role: import('@/query-hooks/useSession').Role; } & Parameters<typeof Button>[0]} props
 * @returns {JSX.Element}
 */
const LinkWithRole = ({ role, className, ...props }) => {
    const router = useRouter();
    const DEFAULT_PROPS = {
        tag: Link,
        color: 'link',
        size: 'lg',
        ...props,
    };

    const activeMap = {
        신청_내역: router.pathname === '/applications',
        운영_기관_어드민: router.pathname.startsWith('/institution/admin'),
        재단_어드민: router.pathname.startsWith('/foundation/admin'),
    };

    switch (role) {
        case ROLE.STUDENT:
        case ROLE.TEACHER:
            return (
                <Button
                    {...DEFAULT_PROPS}
                    href="/applications"
                    active={activeMap.신청_내역}
                    className={cn(
                        styles.link,
                        {
                            [styles.link_active]: activeMap.신청_내역,
                        },
                        className,
                    )}
                >
                    신청 내역
                </Button>
            );
        case ROLE.INSTITUTION:
            return (
                <Button
                    {...DEFAULT_PROPS}
                    href="/institution/admin"
                    active={activeMap.운영_기관_어드민}
                    className={cn(
                        styles.link,
                        {
                            [styles.link_active]: activeMap.운영_기관_어드민,
                        },
                        className,
                    )}
                >
                    운영 기관 어드민
                </Button>
            );
        case ROLE.FOUNDATION:
            return (
                <Button
                    {...DEFAULT_PROPS}
                    href="/foundation/admin/programs"
                    active={activeMap.재단_어드민}
                    className={cn(
                        styles.link,
                        {
                            [styles.link_active]: activeMap.재단_어드민,
                        },
                        className,
                    )}
                >
                    재단 어드민
                </Button>
            );
        default:
            return <></>;
    }
};

export default LinkWithRole;
