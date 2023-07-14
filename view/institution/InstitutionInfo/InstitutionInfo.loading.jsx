import cn from 'classnames';
import { Avatar } from '@goorm-dev/gds-components';

import styles from './InstitutionInfo.module.scss';

function InstitutionInfoLoading() {
    return (
        <div
            className={cn(
                styles.container,
                'd-flex flex-column align-items-center',
            )}
        >
            <div className="mb-4">
                <Avatar customSize="11.25rem" />
            </div>

            <h2 className="mb-2">-</h2>
            <h6>
                전체 프로그램 <span className="text-primary">-</span>
            </h6>
        </div>
    );
}

export default InstitutionInfoLoading;
