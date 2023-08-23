import { useState } from 'react';
import { Button } from '@goorm-dev/gds-components';

import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

import ConfirmModal from './ConfirmModal';

function ConfirmRequiredFile({ rowData }) {
    const { submitFileStatus } = rowData;

    const isDisabled =
        submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.미제출.key;

    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggle = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <>
            <Button color="link" onClick={toggle} disabled={isDisabled}>
                필수 자료 확인
            </Button>
            {/* NOTE: 내부 상태 초기화를 위해 단축 평가 사용 */}
            {isOpenModal && (
                <ConfirmModal
                    isOpen={isOpenModal}
                    toggle={toggle}
                    rowData={rowData}
                />
            )}
        </>
    );
}

export default ConfirmRequiredFile;
