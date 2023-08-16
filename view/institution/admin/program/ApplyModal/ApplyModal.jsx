import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@goorm-dev/gds-components';

const ApplyModal = ({ isOpen, toggle, handleClick }) => (
    <Modal isOpen={isOpen} toggle={toggle} size="md" centered>
        <ModalHeader toggle={toggle}>승인 요청하기</ModalHeader>
        <ModalBody>
            수정한 내용을 한국과학창의재단에 승인 요청하시겠어요?
        </ModalBody>
        <ModalFooter>
            <Button onClick={toggle} color="link" size="lg">
                취소
            </Button>
            <Button onClick={handleClick} color="primary" size="lg">
                승인 요청하기
            </Button>
        </ModalFooter>
    </Modal>
);

export default ApplyModal;
