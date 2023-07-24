import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@goorm-dev/gds-components';
import { useGetInstitution } from '@/query-hooks/useInstitutions';

import styles from './InstitutionInfo.module.scss';

function InstitutionInfo() {
    const {
        query: { institutionId },
    } = useRouter();

    const {
        data: { logo, name },
    } = useGetInstitution(institutionId);

    return (
        <div
            className={cn(
                styles.container,
                'd-flex flex-column align-items-center',
            )}
        >
            <div className="mb-4">
                <Avatar customSize="11.25rem" name={name} src={logo} />
            </div>

            <h2 className={cn('mb-2', styles.name)}>{name}</h2>
        </div>
    );
}

export default InstitutionInfo;
