import React, { useEffect, useState } from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Badge,
    Form,
} from '@goorm-dev/gds-components';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import CustomAlert from '@/components/CustomAlert/CustomAlert';
import {
    useGetInstitutionAdmin,
    usePatchReports,
    useSubmitReports,
} from '@/query-hooks/useInstitutions';

import {
    ALERT_TEXT_MAP,
    BADGE_COLOR_MAP,
    BADGE_TEXT_MAP,
    BADGE_SHOW_MAP,
    CONFIRM_BUTTON_CASE_MAP,
    EDITABLE_MAP,
    FEEDBACK_SHOW_MAP,
    FEEDBACK_TITLE,
    BADGE_ICON_MAP,
} from './SubmitModal.constants';

import FormContent from './FormContent';
import Files from './Files';
import styles from './SubmitModal.module.scss';

import { TEXT_MAP } from '../RequiredFileSubmitButton.constants';
import {
    DEFAULT_FILE_OBJECT,
    REQUIRED_FILE_SUBMIT_STATUS,
} from '@/constants/db';
import useSession from '@/query-hooks/useSession';

function SubmitModal({ isOpen, toggle }) {
    const { data: userData } = useSession.GET();
    const methods = useForm({});
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

    const submitReports = useSubmitReports();
    const patchReports = usePatchReports();

    const {
        reports: { reviewStatus, feedback, fileObject },
    } = instituionAdmin;
    const [isEditable, setIsEditable] = useState(EDITABLE_MAP[reviewStatus]);

    const onSubmit = async (formData) => {
        const { institutionId } = userData;

        const finalFileObject = Object.entries(formData).reduce(
            (acc, [key, { filename, url }]) => {
                if (
                    (REQUIRED_FILE_SUBMIT_STATUS.거절.key ||
                        REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key) &&
                    fileObject[key].url === url
                ) {
                    return acc;
                }

                acc[key] = { filename, url };
                return acc;
            },
            {},
        );

        if (Object.keys(finalFileObject).length === 0) {
            return;
        }

        switch (reviewStatus) {
            case REQUIRED_FILE_SUBMIT_STATUS.미제출.key:
                await submitReports.mutateAsync({
                    institutionId,
                    fileObject: finalFileObject,
                });
                break;

            case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
                await patchReports.mutateAsync({
                    institutionId,
                    fileObject: finalFileObject,
                    reviewStatus: 'SUBMIT',
                });
                break;
            case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
                await patchReports.mutateAsync({
                    institutionId,
                    fileObject: finalFileObject,
                    reviewStatus: 'ADDITIONAL_SUBMIT',
                });
                break;
        }

        toggle();
    };

    useEffect(() => {
        if (!isOpen) {
            /** 모달 닫히면 파일 초기화 */
            setIsEditable(EDITABLE_MAP[reviewStatus]);
            methods.reset();
        }
    }, [isOpen]);

    const buttonCommonProps = {
        size: 'lg',
        color: 'primary',
        type: 'button',
    };

    const formFileValues = methods.getValues() || {};

    const isEdited = !Object.keys(DEFAULT_FILE_OBJECT).every((key) => {
        return (
            fileObject?.[key]?.filename === formFileValues[key]?.filename &&
            fileObject?.[key]?.url === formFileValues[key]?.url
        );
    });

    return (
        <>
            <FormProvider {...methods}>
                <Modal isOpen={isOpen} centered>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <ModalHeader toggle={toggle}>
                            <div className={styles.modalHeader}>
                                <span>{TEXT_MAP[reviewStatus]}</span>
                                {BADGE_SHOW_MAP[reviewStatus] && (
                                    <Badge
                                        size="md"
                                        color={BADGE_COLOR_MAP[reviewStatus]}
                                        leftIcon={BADGE_ICON_MAP[reviewStatus]}
                                    >
                                        {BADGE_TEXT_MAP[reviewStatus]}
                                    </Badge>
                                )}
                            </div>
                        </ModalHeader>

                        <ModalBody className={styles.modalBody}>
                            {reviewStatus !==
                                REQUIRED_FILE_SUBMIT_STATUS.승인.key && (
                                <CustomAlert
                                    leftIcon={NoticeCircleIcon}
                                    className={styles.alert}
                                >
                                    {ALERT_TEXT_MAP[reviewStatus]}
                                </CustomAlert>
                            )}

                            {FEEDBACK_SHOW_MAP[reviewStatus] && (
                                <FormContent.Box>
                                    <FormContent.Box.Title>
                                        {FEEDBACK_TITLE[reviewStatus]}
                                    </FormContent.Box.Title>
                                    <FormContent.Box.Summary>
                                        {feedback || '없음'}
                                    </FormContent.Box.Summary>
                                </FormContent.Box>
                            )}
                            {!isEditable && <Files.ReadOnly />}
                            {isEditable && <Files.Editable />}
                        </ModalBody>

                        <ModalFooter>
                            {CONFIRM_BUTTON_CASE_MAP[reviewStatus] && (
                                <Button {...buttonCommonProps} onClick={toggle}>
                                    확인
                                </Button>
                            )}
                            {!CONFIRM_BUTTON_CASE_MAP[reviewStatus] &&
                                !isEditable && (
                                    <Button
                                        {...buttonCommonProps}
                                        onClick={() => setIsEditable(true)}
                                    >
                                        {reviewStatus ===
                                            REQUIRED_FILE_SUBMIT_STATUS.거절
                                                .key && '수정하기'}
                                        {reviewStatus ===
                                            REQUIRED_FILE_SUBMIT_STATUS
                                                .추가_자료_요청.key &&
                                            '추가하기'}
                                    </Button>
                                )}
                            {!CONFIRM_BUTTON_CASE_MAP[reviewStatus] &&
                                isEditable && (
                                    <Button
                                        {...buttonCommonProps}
                                        disabled={!isEdited}
                                        type="submit"
                                    >
                                        제출하기
                                    </Button>
                                )}
                        </ModalFooter>
                    </Form>
                </Modal>
            </FormProvider>
            <DevTool control={methods.control} />
        </>
    );
}

export default SubmitModal;
