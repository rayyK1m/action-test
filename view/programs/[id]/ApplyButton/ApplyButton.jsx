import {
    Button,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from '@goorm-dev/gds-components';

import styles from './ApplyButton.module.scss';
import { useRouter } from 'next/router';
import useSession from '@/query-hooks/useSession';
import { useState } from 'react';
import { useGetCampTicketsCount } from '@/query-hooks/uesCampTickets';
import { DENYED_PROGRAM_TYPE } from './ApplyButton.constants';

const ApplyButton = () => {
    const router = useRouter();
    const { data: userData } = useSession.GET();
    const [{ isOpen, type }, setModal] = useState({
        isOpen: false,
        type: null,
    });
    const toggleModal = () => {
        setModal({ isOpen: !isOpen, type });
    };

    const { refetch: getCampTicketsCount } = useGetCampTicketsCount(
        {
            userId: userData?.id,
        },
        {
            enabled: false,
        },
    );

    const { id } = router.query;

    const applyProgram = async () => {
        const { count = 0 } = await getCampTicketsCount();

        switch (true) {
            /** 게스트일 경우 어카운트로 이동 */
            case !userData:
                router.push('/login');
                break;
            /** 관리자 계정인 경우 신청 불가 */
            case userData?.role === 'foundation':
            case userData?.role === 'institution':
                setModal({
                    isOpen: true,
                    type: DENYED_PROGRAM_TYPE.관리자_계정,
                });

                break;
            /** 프로그램 신청 갯수가 3개 이상인 경우 신청 불가 */
            case count >= 3:
                setModal({
                    isOpen: true,
                    type: DENYED_PROGRAM_TYPE.신청_갯수_초과,
                });
                break;
            /** 프로그램 신청하기 페이지 이동 */
            default:
                router.push(`/applications/new/${id}`, undefined, {
                    shallow: true,
                });
        }
    };

    return (
        <>
            <Container fluid="xxl" className={styles.container}>
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <Button
                            size="xl"
                            color="primary"
                            block
                            onClick={applyProgram}
                        >
                            신청하기
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>
                    프로그램 신청 안내
                </ModalHeader>
                <ModalBody>
                    {type === DENYED_PROGRAM_TYPE.관리자_계정 &&
                        '프로그램 신청은 일반 회원만 진행이 가능합니다.'}
                    {type === DENYED_PROGRAM_TYPE.신청_갯수_초과 &&
                        '프로그램은 최대 3개까지 신청 가능합니다.'}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="lg" onClick={toggleModal}>
                        확인
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default ApplyButton;
