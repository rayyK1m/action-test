import React, {
    useEffect,
    useMemo,
    useState,
    useRef,
    useCallback,
    forwardRef,
} from 'react';
import { useRouter } from 'next/router';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { Button, Card, SearchInput } from '@goorm-dev/gds-components';
import { RefreshIcon } from '@goorm-dev/gds-icons';

import { useGetCampTicketsAdmin } from '@/query-hooks/uesCampTickets';
import { CAMP_REVIEW_STATUS } from '@/constants/db';
import { ENTER_KEY } from '@/constants/common.js';
import { routerPushShallow } from '@/utils';
import useRowSelections from '@/hooks/useRowSelections';
import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';
import SSRSuspense from '@/components/SSRSuspense';

import { getTableColums } from './SelectApplicantTable.utils';
import SelectApplicantTableLoading from './SelectApplicantTable.loading';

import styles from './SelectApplicantTable.module.scss';

const Table = forwardRef(function Table(
    { setSelectedCount, onSelectedRowChange },
    ref,
) {
    const router = useRouter();
    const { search } = router.query;

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);

    const {
        data: { campApplicants, totalCount },
    } = useGetCampTicketsAdmin({
        programId: router.query.id,
        reviewStatus: CAMP_REVIEW_STATUS.승인.value,
        containCampId: false,
        page: pageIndex + 1,
        limit: pageSize,
        search,
        ...(sorting.length !== 0 && {
            sort: (sorting[0].desc ? '-' : '') + sorting[0].id,
        }),
    });

    const columns = useMemo(() => getTableColums(), []);
    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns,
        data: campApplicants,

        extraColumnType: 'checkIndex',

        usePagination: true,
        manualPagination: true,
        pageCount: Math.ceil(totalCount / pageSize),
        setPagination,
        setSorting,
        pageIndex,
        pageSize,
        sorting,
    });
    const { selectedRows, selectedRowCount, resetRowSelection } =
        useRowSelections(getTableProps().table);

    useEffect(() => {
        ref.current.resetRowSelection = resetRowSelection;
    }, [ref, resetRowSelection]);

    useEffect(() => {
        setSelectedCount(selectedRowCount);
    }, [selectedRowCount, setSelectedCount]);

    useEffect(() => {
        if (!selectedRows[pageIndex]) {
            return;
        }
        const selectedRowData = Object.keys(selectedRows[pageIndex]).map(
            (rowIndex) => campApplicants[rowIndex],
        );

        onSelectedRowChange((prev) => ({
            ...prev,
            [`${pageIndex}`]: selectedRowData,
        }));
    }, [pageIndex, selectedRows, campApplicants, onSelectedRowChange]);

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
    const isFiltered = useMemo(() => !!search, [search]);
    return (
        <>
            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '검색 결과가 없습니다.'
                            : '승인된 신청자가 없습니다.'
                    }
                    imageSrc={
                        isFiltered
                            ? EMPTY_IMAGE_TYPE.SEARCH
                            : EMPTY_IMAGE_TYPE.LIST
                    }
                />
            ) : (
                <div>
                    <Card className={styles.tableCard}>
                        <HScrollTable {...getTableProps()} />
                    </Card>
                    <HScrollTablePagination
                        paginationProps={{
                            ...getPaginationProps(),
                        }}
                    />
                </div>
            )}
        </>
    );
});

function SelectApplicantTable({ onSelectedRowChange }) {
    const router = useRouter();
    const memoizedRouter = useMemo(() => router, []);

    /**
     * tableRef.current = {
     *   resetRowSelection,
     * }
     */
    const tableRef = useRef({}); // NOTE: <Table /> 에서만 접근 가능한 함수(resetRowSelection)를 사용하기 위한 ref
    const [searchText, setSearchText] = useState('');
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSearchChange = useCallback((e) => {
        const {
            target: { value },
        } = e;
        setSearchText(value);
    }, []);

    const handleSearchKeyDown = useCallback(
        (key, value) => {
            if (key === ENTER_KEY) {
                routerPushShallow(memoizedRouter, {
                    search: value,
                });
            }
        },
        [memoizedRouter],
    );

    const handleResetSelection = () => {
        tableRef.current.resetRowSelection();
    };

    return (
        <div className={styles.container}>
            <div className="d-flex align-items-center">
                <div className={styles.title}>
                    <h5>캠프에 소속될 학생을 선택해주세요.</h5>
                    <div className="text-gray-600 paragraph-sm">
                        신청자 관리에서 승인된 신청자만 선택할 수 있습니다.
                    </div>
                </div>

                {selectedCount !== 0 && (
                    <div className="ml-auto d-flex align-items-center">
                        <p className="text-blue-500 mr-3">
                            {selectedCount}명 선택됨
                        </p>
                        <Button
                            size="lg"
                            color="link"
                            icon={<RefreshIcon />}
                            onClick={handleResetSelection}
                        >
                            초기화
                        </Button>
                    </div>
                )}
            </div>

            <SearchInput
                size="lg"
                placeholder="신청자명 검색"
                onChange={handleSearchChange}
                onKeyDown={(e) => handleSearchKeyDown(e.key, searchText)}
                onCancelClick={() => {
                    handleSearchKeyDown(ENTER_KEY, '');
                }}
                value={searchText}
            />

            <SSRSuspense fallback={<SelectApplicantTableLoading />}>
                <Table
                    ref={tableRef}
                    onSelectedRowChange={onSelectedRowChange}
                    setSelectedCount={setSelectedCount}
                />
            </SSRSuspense>
        </div>
    );
}

export default SelectApplicantTable;
