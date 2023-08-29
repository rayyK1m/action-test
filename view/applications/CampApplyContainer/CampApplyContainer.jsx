import { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import {
    TeacherTypeCamp,
    StudentTypeCamp,
} from '@/view/applications/CampForms/CampApplyForm/CampApplyForm';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import GridContainer from '@/components/GridContainer';
import ProgramInfoCard from '@/view/applications/ProgramInfoCard';

import {
    Button,
    Form,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from './CampApplyContainer.module.scss';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    USER_KEYS,
} from '@/view/applications/CampForms/CampForms.constants';
import { useGetProgram } from '@/query-hooks/usePrograms';
import {
    useCreateCampTicket,
    useGetCampTicketsCount,
} from '@/query-hooks/uesCampTickets';
import { PROGRAM_DIVISION, ROLE } from '@/constants/db';

import { formatTeacherData } from './CampApplyContainer.utils';
import { TermsForm } from '../CampForms/TermForm/TermForm';
import useToggle from '@/hooks/useToggle';
import { useRouter } from 'next/router';
import { useGetUserInfo } from '@/query-hooks/useUserInfo';
import { removePhoneNumberHyphen } from '@/utils';
import { MODAL_CONTENTS } from './CampApplyContainer.constants';

function CampApplyContainer({ userData, programId }) {
    const router = useRouter();
    const [isOpen, toggle] = useToggle(false);
    const { data: userInfo } = useGetUserInfo();
    const [modalCase, setModalCase] = useState('default');

    const {
        data: { count },
    } = useGetCampTicketsCount({ userId: userData?.id });

    const handleModalClose = (modalCase) => {
        toggle(false);
        if (modalCase === 'noUserInfo') {
            router.push('/change_info');
        } else {
            router.push('/');
        }
    };

    useEffect(() => {
        /** 필수 유저 정보가 빠져 있는 경우  */
        if (
            !userInfo.swcampUserData?.schoolCode ||
            !userInfo.swcampUserData?.schoolName ||
            !userInfo.userCertificateData?.phoneNumber
        ) {
            setModalCase('noUserInfo');
            toggle(true);
            return;
        }
        /** 신청한 프로그램이 3개 이상일 경우  */
        if (userInfo.swcampUserData.role === ROLE.TEACHER && count >= 3) {
            setModalCase('default');
            toggle(true);
            return;
        }
    }, []);

    const 없는_필수_정보 = [
        !userInfo.userCertificateData?.phoneNumber && '휴대폰',
        (!userInfo.swcampUserData?.schoolCode ||
            !userInfo.swcampUserData?.schoolName) &&
            '소속학교',
    ]
        .filter(Boolean)
        .join(', ');

    const [{ thirdPartyInfoTerm, personalInfoTerm }, setTerms] = useState({
        thirdPartyInfoTerm: false,
        personalInfoTerm: false,
    });

    const {
        data: { item: program },
    } = useGetProgram({ id: programId });
    const createTicket = useCreateCampTicket();

    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_KEYS.institutionKey]: program.institution.name,
            [PROGRAM_KEYS.typeKey]: program.type,
            [PROGRAM_KEYS.nameKey]: program.name,
            [PROGRAM_KEYS.difficultyKey]: program.difficulty,
            [PROGRAM_KEYS.learningTimeKey]: program.learningTime,
            [USER_KEYS.phoneNumberKey]:
                program.type.division === PROGRAM_DIVISION.방문형
                    ? userInfo?.userCertificateData?.phoneNumber || ''
                    : '',
            [USER_KEYS.emailKey]: userData?.email,
            [CAMP_APPLY_KEYS.elementaryTargetKey]: [],
            [CAMP_APPLY_KEYS.middleTargetKey]: [],
            [CAMP_APPLY_KEYS.highTargetKey]: [],
            [CAMP_APPLY_KEYS.startTimeKey]: program.educationDate.start,
            [CAMP_APPLY_KEYS.endTimeKey]: program.educationDate.end,
            [CAMP_APPLY_KEYS.schoolNameKey]:
                userInfo.swcampUserData?.schoolName || '',
            [CAMP_APPLY_KEYS.schoolCodeKey]:
                userInfo.swcampUserData?.schoolCode || '',
            [CAMP_APPLY_KEYS.userNameKey]: userData.name,
        },
    });

    const onSubmit = (data) => {
        const {
            elementarySchool,
            middleSchool,
            highSchool,
            phoneNumber,
            institution,
            programName,
            learningTime,
            type,
            difficulty,
            ...rest
        } = data;

        const formatData = {
            targetGroup: { elementarySchool, middleSchool, highSchool },
            phoneNumber: removePhoneNumberHyphen(phoneNumber),
            ...rest,
        };

        let formData = formatData;
        if (program.type.division === PROGRAM_DIVISION.방문형) {
            formData = formatTeacherData(formatData);
        }

        createTicket.mutate({
            role: userData.role,
            userId: userData.id,
            formData: {
                programId: program.id,
                ...formData,
            },
        });
    };

    /** 신청 대상 정보 error 처리를 위함 */
    const targetFields = methods.watch([
        CAMP_APPLY_KEYS.elementaryTargetKey,
        CAMP_APPLY_KEYS.middleTargetKey,
        CAMP_APPLY_KEYS.highTargetKey,
    ]);
    const isTargetError = useMemo(
        () => _isEmpty(targetFields.flat()),
        [targetFields],
    );

    /** form CTA 버튼 disable 처리를 위함 */
    const disabled =
        !methods.formState.isValid ||
        isTargetError ||
        !(thirdPartyInfoTerm && personalInfoTerm);

    const getCampForm = (campType) => {
        if (campType === PROGRAM_DIVISION.방문형) return TeacherTypeCamp;
        return StudentTypeCamp;
    };
    const { title, contents } = getCampForm(program.type.division);

    return (
        <>
            <Layout>
                <Layout.Header userData={userData} />
                <Layout.Main>
                    <GridContainer colProps={{ md: { size: 10, offset: 1 } }}>
                        <PageHeader>
                            <PageHeader.Title>
                                <div className="d-flex align-items-center">
                                    <Button
                                        icon={<BackPageIcon />}
                                        className="mr-2"
                                        color="link"
                                        onClick={() =>
                                            router.push(
                                                `/programs/${programId}`,
                                            )
                                        }
                                    />
                                    <h3>{title}</h3>
                                </div>
                            </PageHeader.Title>
                        </PageHeader>
                        <ProgramInfoCard
                            program={program}
                            notice="프로그램은 최대 3개까지 신청 가능합니다."
                            className={styles.infoCard}
                        />
                        <FormProvider {...methods}>
                            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                                <div className={styles.forms}>
                                    {contents({ program, userData })}
                                    <TermsForm
                                        terms={{
                                            personalInfoTerm,
                                            thirdPartyInfoTerm,
                                        }}
                                        setTerms={setTerms}
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        color="primary"
                                        size="xl"
                                        disabled={disabled}
                                    >
                                        신청하기
                                    </Button>
                                </div>
                            </Form>
                        </FormProvider>
                    </GridContainer>
                </Layout.Main>
                <Layout.Footer />
            </Layout>

            <Modal
                isOpen={isOpen}
                toggle={toggle}
                size="md"
                backdrop="static"
                centered
                className={styles.modal}
            >
                <ModalHeader>{MODAL_CONTENTS[modalCase].header}</ModalHeader>
                <ModalBody>
                    {MODAL_CONTENTS[modalCase].body(
                        modalCase === 'noUserInfo' && 없는_필수_정보,
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        size="lg"
                        onClick={() => handleModalClose(modalCase)}
                    >
                        {MODAL_CONTENTS[modalCase].footer}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CampApplyContainer;
