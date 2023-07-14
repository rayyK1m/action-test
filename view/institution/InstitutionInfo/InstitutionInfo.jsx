import { useRouter } from 'next/router';
import cn from 'classnames';

import { Avatar } from '@goorm-dev/gds-components';
import useInstitutions from '@/query-hooks/useInstitutions';
import styles from './InstitutionInfo.module.scss';

function InstitutionInfo() {
    const {
        query: { institutionId },
    } = useRouter();

    const {
        data: { item },
    } = useInstitutions.GET({
        queryKeyType: 'itemDetail',
        queryParams: institutionId,
    });
    const { logo, name, programCount } = item;

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

            <h2 className="mb-2">{name}</h2>
            <h6>
                전체 프로그램{' '}
                <span className="text-primary">{programCount}</span>
            </h6>
        </div>
    );
}

export default InstitutionInfo;
