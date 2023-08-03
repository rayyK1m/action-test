import { useEffect, useState, useMemo, useCallback } from 'react';

/**
 *
 * @param {Object<T>} table useHScrollTable의 getTableProps().table을 넘겨준다.
 *
 * @returns {object}
 * selectedRows: Record<Number, Record<Number, Boolean>>
 * ex)
 * {
 *   0: { 0: true, 4: true },
 *   1: { 3: true }
 * }
 * selectedRowCount: Number
 * resetRowSelection: Function
 */
const useRowSelections = (table) => {
    const {
        pagination: { pageIndex },
        rowSelection,
    } = table.getState();
    const [selectedRows, setSelectedRows] = useState({});
    const [selectedRowCount, setSelectedRowCount] = useState(0);
    const setRowSelection = useMemo(() => table.setRowSelection, [table]);
    const resetRowSelection = useCallback(() => {
        table.resetRowSelection();
        setSelectedRows({});
        setSelectedRowCount(0);
    }, [table]);

    useEffect(() => {
        // NOTE: 매뉴얼 페이지네이션 사용 시 페이지가 변경될 때 마다 rowSelection 유지 및 초기화를 위한 코드
        setRowSelection(selectedRows[pageIndex] || {});
    }, [pageIndex]);

    useEffect(() => {
        // NOTE: rowSelection이 변경될 때 마다 해당하는 페이지의 rowSelection 정보를 업데이트 하기 위한 코드
        const rows = {
            ...selectedRows,
            [`${pageIndex}`]: rowSelection,
        };
        setSelectedRows(rows);
        setSelectedRowCount(
            Object.values(rows).reduce(
                (acc, pageRowSelection) =>
                    acc + Object.keys(pageRowSelection).length,
                0,
            ),
        );
    }, [rowSelection]);

    return { selectedRows, selectedRowCount, resetRowSelection };
};

export default useRowSelections;
