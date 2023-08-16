import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';
import { useRouter } from 'next/router';

import {
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Button,
} from '@goorm-dev/gds-components';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';

import { campsKeys } from '@/query-hooks/useCamps';

import styles from './CampDeleteModal.module.scss';

function CampDeleteModal({
    isOpen,
    toggle,
    deleteCamp,
    selectedRows,
    selectedRowCount,
    onClickDeleteButton,
}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
        query: { id: programId },
    } = router;

    const { classNumberStr } = deleteCamp; // 단일 삭제의 경우 사용

    /**
     * 다중 삭제의 경우
     * - 체크된 캠프 중 제일 첫번째 페이지의 첫번째 아이템의 캠프 classNumberStr를 노출 시킨다.
     */
    const firstClassNumberStr = useMemo(() => {
        if (Object.keys(selectedRows).length === 0) return '';

        const filteredSelectedRows = Object.keys(selectedRows).reduce(
            (acc, key) => {
                if (Object.keys(selectedRows[key]).length > 0) {
                    acc[key] = selectedRows[key];
                }
                return acc;
            },
            {},
        );

        if (Object.keys(filteredSelectedRows).length === 0) return '';

        const selectedRowsFirstPageIndex = Object.keys(filteredSelectedRows)[0];
        const selectedRowsFirstItemIndex = Object.keys(
            filteredSelectedRows[selectedRowsFirstPageIndex],
        )[0];

        const selectedRowsFirstPageData = queryClient.getQueriesData(
            campsKeys.itemsProgramDetail(programId, {
                page: String(selectedRowsFirstPageIndex * 1 + 1),
            }),
        )[0];
        // eslint-disable-next-line no-unused-vars
        const [queryKey, queryData] = selectedRowsFirstPageData;
        const { items: selectedRowsFirstItems } = queryData;
        const selectedRowsFirstItem =
            selectedRowsFirstItems[selectedRowsFirstItemIndex * 1];

        return selectedRowsFirstItem?.classNumberStr;
    }, [selectedRows]);

    return (
        <Modal size="md" centered isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} className={styles.modalHeader} />
            <ModalBody
                className={cn(
                    'd-flex flex-column text-center pt-0 pb-5 px-4',
                    styles.modalBody,
                )}
            >
                <NoticeCircleIcon className={cn(styles.warningIcon, 'mb-3')} />

                <div className="d-flex flex-column">
                    <h5 className="mb-1">캠프를 삭제하시겠어요?</h5>
                    <p>
                        {selectedRowCount === 0 ? (
                            <strong>&apos;{classNumberStr}&apos;</strong>
                        ) : (
                            <strong>
                                &apos;{firstClassNumberStr}&apos; 포함{' '}
                                {selectedRowCount}건
                            </strong>
                        )}
                        의 캠프를 캠프 목록에서 삭제합니다. <br /> 캠프 삭제가
                        완료되면 데이터를 되돌릴 수 없습니다.
                    </p>
                </div>
            </ModalBody>

            <ModalFooter className="px-4">
                <Button size="lg" color="link" onClick={toggle}>
                    취소
                </Button>
                <Button size="lg" color="danger" onClick={onClickDeleteButton}>
                    삭제하기
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CampDeleteModal;
