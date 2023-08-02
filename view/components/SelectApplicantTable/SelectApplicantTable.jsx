import React, {
    useEffect,
    useMemo,
    useState,
    useRef,
    useCallback,
    Suspense,
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
import { routerPushShallow } from '@/utils';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';

import { getTableColums } from './SelectApplicantTable.utils';

import styles from './SelectApplicantTable.module.scss';
import SelectApplicantTableLoading from './SelectApplicantTable.loading';

const ENTER_KEY = 'Enter';
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
        page: pageIndex + 1,
        limit: pageSize,
        search,
        ...(sorting.length !== 0 && {
            sort: (sorting[0].desc ? '-' : '') + sorting[0].id,
        }),
    });

    const columns = useMemo(() => getTableColums(), []);
    const {
        getTableProps,
        getPaginationProps,
        state: { rowSelection },
    } = useHScrollTable({
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

    useEffect(() => {
        ref.current.resetRowSelection = getTableProps().table.resetRowSelection;
    }, []);

    useEffect(() => {
        // NOTE: 매뉴얼 페이지네이션 사용 시 페이지가 변경될 때 마다 rowSelection 유지 및 초기화를 위한 코드
        getTableProps().table.setRowSelection(ref.current[pageIndex] || {});
    }, [pageIndex]);

    useEffect(() => {
        // NOTE: rowSelection이 변경될 때 마다 해당하는 페이지의 rowSelection 정보를 업데이트 하기 위한 코드
        ref.current.selectedRows = {
            ...ref.current.selectedRows,
            [`${pageIndex}`]: rowSelection,
        };
        setSelectedCount(
            Object.values(ref.current.selectedRows).reduce(
                (acc, pageRowSelection) =>
                    acc + Object.keys(pageRowSelection).length,
                0,
            ),
        );
    }, [rowSelection]);

    useEffect(() => {
        if (!ref.current.selectedRows[pageIndex]) {
            return;
        }
        const selectedRowData = Object.keys(
            ref.current.selectedRows[pageIndex],
        ).map((rowIndex) => campApplicants[rowIndex]);

        onSelectedRowChange(selectedRowData);
    }, [pageIndex, campApplicants, onSelectedRowChange]);

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
    const isFiltered = useMemo(() => !!search, [search]);
    return (
        <>
            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '해당하는 신청자가 없습니다.'
                            : '승인된 신청자가 없습니다.'
                    }
                    type="NO_LIST"
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

    const tableRef = useRef({});
    const [searchText, setSearchText] = useState('');
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSearchChange = useCallback((e) => {
        const {
            target: { value },
        } = e;
        setSearchText(value);
    }, []);

    const handleSearchKeyDown = useCallback((key, value) => {
        if (key === ENTER_KEY) {
            routerPushShallow(router, {
                search: value,
            });
        }
    }, []);

    const handleResetSelection = () => {
        // getTableProps().table.resetRowSelection();
        tableRef.current.resetRowSelection();
        tableRef.current.selectedRows = {};
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

            <Suspense fallback={<SelectApplicantTableLoading />}>
                <Table
                    ref={tableRef}
                    onSelectedRowChange={onSelectedRowChange}
                    setSelectedCount={setSelectedCount}
                />
            </Suspense>
        </div>
    );
}

export default SelectApplicantTable;
