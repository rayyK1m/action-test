import { useForm, FormProvider } from 'react-hook-form';
import {
    TeacherInfoForm,
    StudentInfoForm,
} from '@/view/applications/CampForms/CampInfoForm/CampInfoForm';
import {
    CampTypeBadge,
    ReviewStatusBadge,
} from './ApplicantTicketInfoPannel.utils';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
} from '@/view/applications/CampForms/CampForms.constants';

import {
    useChangeCampTicketStatus,
    useGetCampTicketAdmin,
} from '@/query-hooks/uesCampTickets';

import {
    SidePannel,
    Button,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@goorm-dev/gds-components';
import styles from './ApplicantTicketInfoPannel.module.scss';
import PageHeader from '@/components/PageHeader';
import useToggle from '@/hooks/useToggle';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider';
import { CAMP_REVIEW_STATUS, PROGRAM_DIVISION } from '@/constants/db';
import PannelLoading from '@/components/PannelLoading';
import { useRouter } from 'next/router';

function ApplicantTicketInfoPannel({ isOpen, onClose, ticketId }) {
    const router = useRouter();
    let isFoundationPage = false;
    if (router.pathname.split('/')[0] === 'foundation') {
        isFoundationPage = true;
    }

    const [isApproveModalOpen, toggleApprove] = useToggle();
    const [isRejectModalOpen, toggleReject] = useToggle();

    const { data: ticket, isLoading } = useGetCampTicketAdmin({
        id: ticketId,
        isOpen,
    });
    const changeTicketStatus = useChangeCampTicketStatus();

    const handleReviewStatus = (reviewStatus) => {
        changeTicketStatus.mutate({
            id: ticketId,
            status: reviewStatus,
        });
    };

    const methods = useForm({
        values: {
            ...ticket,
            [PROGRAM_KEYS.institutionKey]: ticket?.institution[0].name,
            [PROGRAM_KEYS.nameKey]: ticket?.program.name,
            [PROGRAM_KEYS.typeKey]: `${ticket?.program.type.division} / ${ticket?.program.type.duration}`,
            [PROGRAM_KEYS.learningTimeKey]: ticket?.program.learningTime,
            [CAMP_APPLY_KEYS.elementaryTargetKey]:
                ticket?.targetGroup.elementarySchool,
            [CAMP_APPLY_KEYS.middleTargetKey]: ticket?.targetGroup.middleSchool,
            [CAMP_APPLY_KEYS.highTargetKey]: ticket?.targetGroup.highSchool,
            [CAMP_APPLY_KEYS.mainEducatorKey]: ticket?.educator?.main,
            [CAMP_APPLY_KEYS.subEducatorKey]: ticket?.educator?.sub,
            [CAMP_APPLY_KEYS.startDateKey]: ticket?.educationDate?.start,
            [CAMP_APPLY_KEYS.startTimeKey]: ticket?.educationDate?.start,
            [CAMP_APPLY_KEYS.endDateKey]: ticket?.educationDate?.end,
            [CAMP_APPLY_KEYS.endTimeKey]: ticket?.educationDate?.end,
        },
    });

    const getCampForm = (campType) => {
        if (campType === PROGRAM_DIVISION.방문형)
            return (
                <TeacherInfoForm
                    programTarget={ticket?.program.targetGroup}
                    isAdmin
                    isFoundationPage={isFoundationPage}
                />
            );
        return (
            <StudentInfoForm
                programTarget={ticket?.program.targetGroup}
                isAdmin
            />
        );
    };
    const ticketForm = getCampForm(ticket?.program.type.division);

    return (
        <>
            <SidePannel isOpen={isOpen} onClose={onClose}>
                <SidePannel.Header>신청자 관리</SidePannel.Header>

                <SidePannel.Body className={styles.drawer}>
                    {isLoading ? (
                        <PannelLoading />
                    ) : (
                        <div>
                            <PageHeader useHrTag={true}>
                                <PageHeader.Title>
                                    <div className="d-flex justify-content-between">
                                        <div className={styles.header}>
                                            <h3>신청 정보</h3>
                                            <div className={styles.headerInfo}>
                                                <div>
                                                    <span className="text-hint mr-1">
                                                        캠프
                                                    </span>
                                                    <span>
                                                        {ticket?.program.name}
                                                    </span>
                                                </div>
                                                <Divider height="0.75rem" />
                                                <div className="d-flex align-items-center">
                                                    <p className="text-hint mr-1">
                                                        신청자
                                                    </p>
                                                    <p className="mr-1">
                                                        {ticket?.userName}
                                                    </p>
                                                    {
                                                        CampTypeBadge[
                                                            ticket?.program.type
                                                                .division
                                                        ]
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            {
                                                ReviewStatusBadge[
                                                    ticket?.reviewStatus
                                                ]
                                            }
                                        </div>
                                    </div>
                                </PageHeader.Title>
                                {!isFoundationPage && (
                                    <PageHeader.Description>
                                        방문형의 경우, 신청자 승인을 하면 캠프가
                                        바로 생성됩니다.
                                    </PageHeader.Description>
                                )}
                            </PageHeader>
                            <FormProvider {...methods}>
                                <Form className="mt-4">{ticketForm}</Form>
                            </FormProvider>
                        </div>
                    )}
                </SidePannel.Body>
                {!isFoundationPage &&
                    ticket?.reviewStatus ===
                        CAMP_REVIEW_STATUS.심사중.value && (
                        <SidePannel.Footer className="d-flex justify-content-end">
                            <Button
                                color="danger"
                                size="lg"
                                onClick={toggleReject}
                                className="mr-2"
                            >
                                거절하기
                            </Button>
                            <Button
                                size="lg"
                                icon={<CheckCircleIcon />}
                                color="success"
                                onClick={toggleApprove}
                            >
                                승인하기
                            </Button>
                        </SidePannel.Footer>
                    )}
            </SidePannel>

            {/* 신청 승인 모달 */}
            <Modal
                isOpen={isApproveModalOpen}
                toggle={toggleApprove}
                size="md"
                centered
            >
                <ModalHeader toggle={toggleApprove}>승인하기</ModalHeader>
                <ModalBody>
                    {`'${ticket?.userName}' 신청자를 승인하시겠어요?`}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggleApprove} color="link" size="lg">
                        취소
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleReviewStatus(CAMP_REVIEW_STATUS.승인.value);
                            toggleApprove();
                        }}
                        size="lg"
                    >
                        승인하기
                    </Button>
                </ModalFooter>
            </Modal>

            {/* 신청 취소 모달 */}
            <Modal
                isOpen={isRejectModalOpen}
                toggle={toggleReject}
                size="md"
                centered
            >
                <ModalHeader toggle={toggleReject}>거절하기</ModalHeader>
                <ModalBody>
                    {`'${ticket?.userName}' 신청자를 거절하시겠어요?`}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggleReject} color="link" size="lg">
                        취소
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => {
                            handleReviewStatus(CAMP_REVIEW_STATUS.거절.value);
                            toggleReject();
                        }}
                        size="lg"
                    >
                        거절하기
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ApplicantTicketInfoPannel;
