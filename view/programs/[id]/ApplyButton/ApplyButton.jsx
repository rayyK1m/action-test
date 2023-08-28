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
import {
    campTicketsKeys,
    useGetCampTicketHistory,
    useGetCampTicketsCount,
} from '@/query-hooks/uesCampTickets';
import { DENYED_PROGRAM_TYPE } from './ApplyButton.constants';
import useProgram from '@/query-hooks/useProgram';
import { useQueryClient } from '@tanstack/react-query';
import { CAMP_REVIEW_STATUS, PROGRAM_DIVISION, ROLE } from '@/constants/db';

const ApplyButton = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { id } = router.query;

    const { data: userData } = useSession.GET();
    const [{ isOpen, type }, setModal] = useState({
        isOpen: false,
        type: null,
    });
    const toggleModal = () => {
        setModal({ isOpen: !isOpen, type });
    };

    const {
        data: { item: programData },
    } = useProgram.GET({ type: 'detail', id });
    const { refetch: getCampTicketsCount } = useGetCampTicketsCount(
        {
            userId: userData?.id,
        },
        {
            enabled: false,
        },
    );

    const { data: campTicketHistoryData } = useGetCampTicketHistory({
        programId: id,
    });

    const checkAuth = () => {
        if (!userData) {
            /** 게스트일 경우 로그인창으로 이동 */
            router.push('/login');
            return false;
        }

        const { role } = userData;
        if (role === 'foundation' || role === 'institution') {
            /** 관리자 계정인 경우 신청 불가 */
            setModal({
                isOpen: true,
                type: DENYED_PROGRAM_TYPE.관리자_계정,
            });
            return false;
        }

        /** 신청 가능한 계정 */
        return true;
    };

    const checkDivision = async () => {
        if (programData.type.division === PROGRAM_DIVISION.방문형) {
            /** 방문형일 경우에만 특이 케이스가 존재함 */
            await getCampTicketsCount();

            const { count = 0 } = queryClient.getQueryData(
                campTicketsKeys.count(),
            );

            if (count >= 3) {
                /** 프로그램 신청 갯수가 3개 이상인 경우 신청 불가 */
                setModal({
                    isOpen: true,
                    type: DENYED_PROGRAM_TYPE.신청_갯수_초과,
                });
                return false;
            }
        }

        /** 신청 가능한 case */
        return true;
    };

    const applyProgram = async () => {
        /** *체크 순서 중요* */
        if (checkAuth() && (await checkDivision())) {
            /** 프로그램 신청하기 페이지 이동 */
            router.push(`/applications/new/${id}`, undefined, {
                shallow: true,
            });
        }
    };

    const 학생이_방문형_신청 =
        userData?.role === ROLE.STUDENT &&
        programData.type.division === PROGRAM_DIVISION.방문형;
    const 선생님이_집합형_신청 =
        userData?.role === ROLE.TEACHER &&
        programData.type.division === PROGRAM_DIVISION.집합형;
    const isDisabledApplyButton =
        programData.applyStatus === '모집_예정' ||
        programData.applyStatus === '모집_종료' ||
        /** 이미 신청한 프로그램 */
        campTicketHistoryData?.item?.reviewStatus ===
            CAMP_REVIEW_STATUS.심사중.key ||
        campTicketHistoryData?.item?.reviewStatus ===
            CAMP_REVIEW_STATUS.승인.key ||
        campTicketHistoryData?.item?.reviewStatus ===
            CAMP_REVIEW_STATUS.거절.key ||
        학생이_방문형_신청 ||
        선생님이_집합형_신청;

    const applyButtonText = (() => {
        const textMap = {
            모집_예정: '모집 예정인 프로그램입니다.',
            모집_중: '신청하기',
            모집_종료: '모집이 마감된 프로그램입니다.',
        };

        switch (true) {
            case campTicketHistoryData?.item?.reviewStatus ===
                CAMP_REVIEW_STATUS.심사중.key:
            case campTicketHistoryData?.item?.reviewStatus ===
                CAMP_REVIEW_STATUS.승인.key:
            case campTicketHistoryData?.item?.reviewStatus ===
                CAMP_REVIEW_STATUS.거절.key:
                textMap['모집_중'] = '이미 신청한 프로그램입니다.';
                break;
            case 학생이_방문형_신청:
                textMap['모집_중'] = '선생님만 신청할 수 있는 프로그램입니다.';
                break;
            case 선생님이_집합형_신청:
                textMap['모집_중'] =
                    '학생·학부모만 신청할 수 있는 프로그램입니다.';
                break;
        }

        return textMap[programData.applyStatus];
    })();

    return (
        <div className={styles.container}>
            <Container fluid="xxl">
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <Button
                            size="xl"
                            color="primary"
                            block
                            onClick={applyProgram}
                            disabled={isDisabledApplyButton}
                        >
                            {applyButtonText}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={toggleModal} centered size="md">
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
        </div>
    );
};

export default ApplyButton;
