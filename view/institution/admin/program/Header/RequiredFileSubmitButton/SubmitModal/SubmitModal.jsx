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
    useSubmitExtraReports,
    useSubmitReports,
} from '@/query-hooks/useInstitutions';

import {
    ALERT_TEXT_MAP,
    BADGE_COLOR_MAP,
    BADGE_TEXT_MAP,
    CONFIRM_BUTTON_CASE_MAP,
    EDITABLE_MAP,
} from './SubmitModal.constants';

import FormContent from './FormContent';
import Files from './Files';
import styles from './SubmitModal.module.scss';

import { TEXT_MAP } from '../RequiredFileSubmitButton.constants';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import useSession from '@/query-hooks/useSession';

function SubmitModal({ isOpen, toggle }) {
    const { data: userData } = useSession.GET();
    const methods = useForm({});
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

    const submitReports = useSubmitReports();
    const patchReports = usePatchReports();
    const submitExtraReports = useSubmitExtraReports();

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

                acc[key] = { name: filename, url };
                return acc;
            },
            {},
        );

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
                });
                break;

            case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
                await submitExtraReports.mutateAsync({
                    institutionId,
                    fileObject: finalFileObject,
                });
                break;
        }

        toggle();
    };

    useEffect(() => {
        if (!isOpen) setIsEditable(EDITABLE_MAP[reviewStatus]);
    }, [isOpen]);

    const buttonCommonProps = {
        size: 'lg',
        color: 'primary',
        type: 'button',
    };

    const fileValues = Object.values(methods.getValues());

    const isDisabled = fileValues.length
        ? !fileValues.every(({ filename, url }) => filename && url)
        : true;

    return (
        <>
            <FormProvider {...methods}>
                <Modal isOpen={isOpen} toggle={toggle} centered>
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <ModalHeader toggle={toggle}>
                            <span>{TEXT_MAP[reviewStatus]}</span>
                            {!(
                                reviewStatus ===
                                    REQUIRED_FILE_SUBMIT_STATUS.미제출.key ||
                                reviewStatus ===
                                    REQUIRED_FILE_SUBMIT_STATUS.승인.key
                            ) && (
                                <Badge
                                    size="md"
                                    className="ml-2"
                                    color={BADGE_COLOR_MAP[reviewStatus]}
                                >
                                    {BADGE_TEXT_MAP[reviewStatus]}
                                </Badge>
                            )}
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

                            {reviewStatus ===
                                REQUIRED_FILE_SUBMIT_STATUS.거절.key && (
                                <FormContent.Box>
                                    <FormContent.Box.Title>
                                        거절 사유
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
                                        수정하기
                                    </Button>
                                )}
                            {!CONFIRM_BUTTON_CASE_MAP[reviewStatus] &&
                                isEditable && (
                                    <Button
                                        {...buttonCommonProps}
                                        disabled={isDisabled}
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
