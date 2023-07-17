import Link from 'next/link';
import cn from 'classnames';

import { Avatar } from '@goorm-dev/gds-components';
import styles from './InstitutionCard.module.scss';

function InstitutionCard({ institutionId, logo, name, programCount }) {
    return (
        <Link href={`/institutions/${institutionId}`}>
            <div
                className={cn(
                    'd-flex align-items-center rounded',
                    styles.container,
                )}
            >
                <Avatar size="xl" name={name} src={logo} />

                <span className={styles.contents}>
                    <h6 className={cn(styles.title, 'mb-1')}>{name}</h6>
                    <p className="text-hint">
                        모집 중인 프로그램 {programCount}개
                    </p>
                </span>
            </div>
        </Link>
    );
}

export default InstitutionCard;
