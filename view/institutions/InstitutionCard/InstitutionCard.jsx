import { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@goorm-dev/gds-components';

import styles from './InstitutionCard.module.scss';

import { DEFAULT_AVATAR_IMAGE } from '@/constants/common';

function InstitutionCard({ institutionId, logoUrl, name, programCount }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const avatarImageUrl = logoUrl || DEFAULT_AVATAR_IMAGE;

    const handleCard = () => {
        if (programCount === 0) setIsModalOpen(true);
        else router.push(`/institutions/${institutionId}`);
    };

    const handleModal = () => setIsModalOpen((prevModal) => !prevModal);

    return (
        <>
            <Modal size="md" centered isOpen={isModalOpen} toggle={handleModal}>
                <ModalHeader close>운영 기관 안내</ModalHeader>
                <ModalBody>
                    <p> 운영 기관이 프로그램을 준비중입니다.</p>
                    <p>
                        새 프로그램이 등록되면 프로그램 목록을 확인할 수
                        있습니다.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="lg" onClick={handleModal}>
                        확인
                    </Button>
                </ModalFooter>
            </Modal>
            <div
                type="button"
                className={cn(
                    'd-flex align-items-center rounded',
                    styles.container,
                )}
                onClick={handleCard}
            >
                <Avatar size="xl" name={name} src={avatarImageUrl} />

                <span className={styles.contents}>
                    <h6 className={cn(styles.title, 'mb-1')}>{name}</h6>
                    <p className="text-hint">프로그램 {programCount}개</p>
                </span>
            </div>
        </>
    );
}

export default InstitutionCard;
