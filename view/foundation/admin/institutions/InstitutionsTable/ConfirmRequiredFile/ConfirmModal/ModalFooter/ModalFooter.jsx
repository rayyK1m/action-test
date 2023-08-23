import { ModalFooter as GDSModalFooter } from '@goorm-dev/gds-components';
import ButtonGroup from '../ButtonGroup';
import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

function ModalFooter() {
    const { rowData, requiredFeedback } = useContext(ConfirmModalContext);

    const { submitFileStatus } = rowData;

    switch (true) {
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key &&
            !requiredFeedback:
            return <></>;
        default:
            return (
                <GDSModalFooter>
                    <ButtonGroup />
                </GDSModalFooter>
            );
    }
}

export default ModalFooter;
