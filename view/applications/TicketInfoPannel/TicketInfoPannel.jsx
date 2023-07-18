import { useForm, FormProvider } from 'react-hook-form';

import {
    TeacherInfoForm,
    StudentInfoForm,
} from '../CampForms/CampInfoForm/CampInfoForm';
import ProgramInfoCard from '../ProgramInfoCard';

import { CAMP_APPLY_KEYS, PROGRAM_KEYS } from '../CampForms/camp.constants';

import {
    useCancelCampTicket,
    useGetCampTicket,
} from '@/query-hooks/uesCampTickets';

import {
    SidePannel,
    Button,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge,
} from '@goorm-dev/gds-components';
import styles from './TicketInfoPannel.module.scss';
import PageHeader from '@/components/PageHeader';
import useSession from '@/query-hooks/useSession';
import useToggle from '@/hooks/useToggle';
import { ErrorCircleIcon } from '@goorm-dev/gds-icons';

function TicketInfoPannel({ isOpen, onClose, ticketId }) {
    const [isModalOpen, toggle] = useToggle();

    const { data: userData } = useSession.GET();
    /** NOTE : 로딩 시 뷰가 없어 임시 처리되어 있는 상태 - 처리 필요 */
    const { data: ticket, isLoading } = useGetCampTicket({
        id: ticketId,
        userId: userData.id,
        isOpen,
    });

    const cancelTicket = useCancelCampTicket();
    const handleCancel = () => {
        cancelTicket.mutate({
            id: ticketId,
            userId: userData.id,
        });
        toggle();
    };

    const methods = useForm({
        values: {
            ...ticket,
            [PROGRAM_KEYS.institutionKey]: ticket?.institution[0].name,
            [PROGRAM_KEYS.nameKey]: ticket?.program.name,
            [PROGRAM_KEYS.typeKey]: `${ticket?.program.type.division}/${ticket?.program.type.duration}`,
            [PROGRAM_KEYS.learningTimeKey]: `${ticket?.program.learningTime}시간`,
            [CAMP_APPLY_KEYS.elementaryTargetKey]:
                ticket?.targetGroup.elementarySchool,
            [CAMP_APPLY_KEYS.middleTargetKey]: ticket?.targetGroup.middleSchool,
            [CAMP_APPLY_KEYS.highTargetKey]: ticket?.targetGroup.highSchool,
            [CAMP_APPLY_KEYS.mainEducatorKey]: ticket?.educator?.main,
            [CAMP_APPLY_KEYS.subEducatorKey]: ticket?.educator?.sub,
        },
    });

    const getCampForm = (campType) => {
        if (campType === '방문형') return TeacherInfoForm;
        return StudentInfoForm;
    };

    const ticketForm = getCampForm(ticket?.program.type.division);

    return (
        <>
            <SidePannel
                isOpen={isOpen}
                onClose={onClose}
                className={styles.pannel}
            >
                <SidePannel.Header />
                <SidePannel.Body className={styles.drawer}>
                    <PageHeader useHrTag={true}>
                        <PageHeader.Title>
                            <div className="d-flex justify-content-between">
                                <div className={styles.header}>
                                    <h3>신청 정보</h3>
                                    <div className="d-flex align-items-center">
                                        <p className="text-hint mr-1">
                                            프로그램
                                        </p>
                                        <p>{ticket?.program.name}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {ticket?.reviewStatus === 'CANCEL' ? (
                                        <Badge color="danger" size="lg">
                                            <ErrorCircleIcon className="mr-1" />
                                            신청 취소됨
                                        </Badge>
                                    ) : (
                                        <Button
                                            color="danger"
                                            size="lg"
                                            onClick={toggle}
                                        >
                                            신청 취소하기
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </PageHeader.Title>
                    </PageHeader>
                    <ProgramInfoCard
                        program={ticket?.program}
                        notice="신청 정보 수정을 원하신다면, 운영 기관 측에 문의해주세요."
                    />
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <FormProvider {...methods}>
                            <Form>{ticketForm}</Form>
                        </FormProvider>
                    )}
                </SidePannel.Body>
            </SidePannel>

            {/* 신청 취소 모달 */}
            <Modal isOpen={isModalOpen} toggle={toggle} size="md" centered>
                <ModalHeader toggle={toggle}>신청 취소하기</ModalHeader>
                <ModalBody>
                    {`'${ticket?.program.name}' 신청을 취소하시겠습니까?`}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle} color="link">
                        닫기
                    </Button>
                    <Button color="danger" onClick={handleCancel}>
                        취소하기
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default TicketInfoPannel;
