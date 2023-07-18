import Link from 'next/link';

import cn from 'classnames';
import styles from './NavTab.module.scss';
import { useRouter } from 'next/router';

function NavTab() {
    const router = useRouter();

    return (
        <div className={styles.nav}>
            <Link href={'/foundation/admin/programs'}>
                <h3
                    className={cn({
                        ['text-info']:
                            router.pathname !== '/foundation/admin/programs',
                    })}
                >
                    프로그램 관리
                </h3>
            </Link>
            <Link href={'/foundation/admin/institutions'}>
                <h3
                    className={cn({
                        ['text-info']:
                            router.pathname !==
                            '/foundation/admin/institutions',
                    })}
                >
                    기관 관리
                </h3>
            </Link>
        </div>
    );
}

export default NavTab;
