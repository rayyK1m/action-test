import React from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@goorm-dev/gds-components';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';

import CustomAlert from '@/components/CustomAlert/CustomAlert';

import styles from './SubmitModal.module.scss';

function SubmitModal({ isOpen, toggle }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>필수 자료 제출하기</ModalHeader>

            <ModalBody>
                <CustomAlert leftIcon={CheckCircleIcon} className="mb-1">
                    선정된 운영 기관은 사업 추진을 위해 아래 자료를 필수로
                    한국과학창의재단에 제출해야 합니다.
                </CustomAlert>

                <div className={styles.fileInputs}>
                    {/* <FileInput />
                    <FileInput /> */}
                </div>
            </ModalBody>

            <ModalFooter>
                <Button size="lg" color="link">
                    임시 저장하기
                </Button>
                <Button size="lg" color="primary">
                    제출하기
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default SubmitModal;
