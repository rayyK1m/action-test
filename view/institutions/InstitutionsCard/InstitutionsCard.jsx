import cn from 'classnames';

import { Avatar } from '@goorm-dev/gds-components';
import styles from './InstitutionsCard.module.scss';

function InstitutionsCard() {
    const num = 3;
    const logo = undefined;

    return (
        <div
            className={cn(
                'd-flex align-items-center rounded',
                styles.container,
            )}
        >
            <Avatar
                name="최준영"
                size="xl"
                className={styles.avatar}
                src={logo}
            />

            <span>
                <h6 className={cn(styles.title, 'mb-1')}>
                    한국청소년교육사회적협동조합한국청소년교육사회적협동조합
                </h6>
                <p className="text-hint">모집 중인 프로그램 {num}개</p>
            </span>
        </div>
    );
}

export default InstitutionsCard;
