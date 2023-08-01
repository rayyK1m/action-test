import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@goorm-dev/gds-components';
import { useGetInstitution } from '@/query-hooks/useInstitutions';

import styles from './InstitutionInfo.module.scss';

import { DEFAULT_AVATAR_IMAGE_LG } from '@/constants/common';

function InstitutionInfo() {
    const {
        query: { institutionId },
    } = useRouter();

    const {
        data: { logo, name },
    } = useGetInstitution(institutionId);

    const avatarImage = logo?.url || DEFAULT_AVATAR_IMAGE_LG;

    return (
        <div
            className={cn(
                styles.container,
                'd-flex flex-column align-items-center',
            )}
        >
            <div className="mb-4">
                <Avatar customSize="11.25rem" name={name} src={avatarImage} />
            </div>

            <h2 className={cn('mb-2', styles.name)}>{name}</h2>
        </div>
    );
}

export default InstitutionInfo;
