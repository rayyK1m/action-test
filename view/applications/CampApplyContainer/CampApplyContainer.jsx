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
import { PROGRAM_DIVISION } from '@/constants/db';

import { formatTeacherData } from './CampApplyContainer.utils';
import { TermsForm } from '../CampForms/TermForm/TermForm';
import Link from 'next/link';
import useToggle from '@/hooks/useToggle';
import { useRouter } from 'next/router';
import { useGetUserInfo } from '@/query-hooks/useUserInfo';

function CampApplyContainer({ userData, programId }) {
    const router = useRouter();
    const [isOpen, toggle] = useToggle(false);
    const {
        data: {
            swcampUserData: { schoolCode = '', schoolName = '' },
            // userCertificateData: { phoneNumber },
        },
    } = useGetUserInfo();

    const {
        data: { count },
    } = useGetCampTicketsCount({ userId: userData?.id });

    const handleModalClose = () => {
        toggle(false);
        router.push('/');
    };
    /** 신청한 프로그램이 3개 이상일 경우 다른 페이지로 안내하기 전 모달 띄워주기 위한 처리 */
    useEffect(() => {
        if (count >= 3) toggle(true);
    }, []);

    const [{ thirdPartyInfoTerm, personalInfoTerm }, setTerms] = useState({
        thirdPartyInfoTerm: false,
        personalInfoTerm: false,
    });

    const {
        data: { item: program },
    } = useGetProgram({ id: programId });
    const createTicket = useCreateCampTicket();

    {
        /* NOTE: 010-1234-1234는 캠프 신청을 위한 임시방편(핸드폰 번호가 형식에 맞지 않으면 캠프 신청이 안됨)
        테스트 유저에는 userCertification 정보가 없어서, 핸드폰 번호를 못 가져오므로 일단 임시로 추가해둠. 
        유저 데이터에 추가되도록 수정 예정 */
    }
    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_KEYS.institutionKey]: program.institution.name,
            [PROGRAM_KEYS.typeKey]: program.type,
            [PROGRAM_KEYS.nameKey]: program.name,
            [PROGRAM_KEYS.learningTimeKey]: program.learningTime,
            [USER_KEYS.phoneNumberKey]:
                program.type.division === PROGRAM_DIVISION.방문형
                    ? userData?.phoneNumber || '010-1234-1234'
                    : '',
            [USER_KEYS.emailKey]: userData?.email,
            [CAMP_APPLY_KEYS.elementaryTargetKey]: [],
            [CAMP_APPLY_KEYS.middleTargetKey]: [],
            [CAMP_APPLY_KEYS.highTargetKey]: [],
            /** 유저 데이터 연결 안해서 임시로 지정해둔 상태, 수정 예정 */
            [CAMP_APPLY_KEYS.schoolNameKey]: schoolName,
            [CAMP_APPLY_KEYS.schoolCodeKey]: schoolCode,
            [CAMP_APPLY_KEYS.userNameKey]: '김구름',
        },
    });

    const onSubmit = (data) => {
        const {
            elementarySchool,
            middleSchool,
            highSchool,
            institution,
            programName,
            learningTime,
            type,
            ...rest
        } = data;

        const formatData = {
            targetGroup: { elementarySchool, middleSchool, highSchool },
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
                                        tag={Link}
                                        className="mr-2"
                                        color="link"
                                        href={`/programs/${programId}`}
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
            >
                <ModalHeader>프로그램 신청 안내</ModalHeader>
                <ModalBody>프로그램은 최대 3개까지 신청 가능합니다.</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        size="lg"
                        onClick={handleModalClose}
                    >
                        확인
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CampApplyContainer;
