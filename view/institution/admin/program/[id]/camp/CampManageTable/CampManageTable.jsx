import { useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'query-string';

import { HScrollTable, HScrollTablePagination } from '@goorm-dev/gds-tables';

import styles from './CampManageTable.module.scss';
import { useEffect } from 'react';

function CampManageTable({ getTableProps, getPaginationProps }) {
    const router = useRouter();
    const [query, setQuery] = useState(router.query);

    const basePath = router.asPath.substring(0, router.asPath.lastIndexOf('?')); // 쿼리 스트링을 제외한 basePath

    useEffect(() => {
        setQuery(router.query);
    }, [router.query]);

    const onPageChange = (page) => {
        // eslint-disable-next-line no-unused-vars
        const { id: noUsedProgramId, ...restQuery } = query;

        const queryString = qs.stringify({
            /**
             * programId는 querystring에서 제외된다.
             */
            ...restQuery,
            page,
        });

        // TODO: sorting 했을 때, router.push 하면, query key가 그대로 유지되는 문제 해결하기
        router.push(`${basePath}?${queryString}`);
    };

    return (
        <div className={styles.container}>
            <HScrollTable {...getTableProps()} />
            <HScrollTablePagination
                paginationProps={{
                    ...getPaginationProps(),
                    onPageChangeHandler: onPageChange,
                }}
            />
        </div>
    );
}

export default CampManageTable;
