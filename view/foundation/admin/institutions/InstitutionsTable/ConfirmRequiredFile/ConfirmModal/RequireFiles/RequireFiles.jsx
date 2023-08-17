import { useContext } from 'react';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';

import { ConfirmModalContext } from '../ConfirmModal';
import FormContent from '../FormContent';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './RequireFiles.module.scss';
import { Input } from '@goorm-dev/gds-components';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

function RequireFiles() {
    const { isOpen, rowData } = useContext(ConfirmModalContext);
    const { id: institutionId, submitFileStatus } = rowData;

    const { data: instituionAdmin } = useGetInstitutionAdmin(institutionId, {
        enabled: isOpen,
    });

    const {
        reports: { fileObject },
    } = instituionAdmin;

    return (
        <>
            {Object.entries(fileObject)
                .filter(([_, { filename, url }]) => !!(filename && url))
                .map(([key, { label, filename, url }]) => (
                    <FormContent.Box key={`${key}-readonly`}>
                        <FormContent.Box.Title isRequired>
                            {label}
                        </FormContent.Box.Title>
                        <div>
                            <DownloadButton
                                size="lg"
                                href={url}
                                filename={filename}
                            >
                                {filename}
                            </DownloadButton>
                        </div>
                    </FormContent.Box>
                ))}
            {(submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.거절.key ||
                submitFileStatus ===
                    REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key ||
                submitFileStatus ===
                    REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key) && (
                <FormContent.Box>
                    <FormContent.Box.Title>거절 사유</FormContent.Box.Title>
                    <Input
                        type="textarea"
                        size="lg"
                        rows={4}
                        value={instituionAdmin.reports.feedback || ''}
                        onChange={() => instituionAdmin.reports.feedback || ''}
                    />
                </FormContent.Box>
            )}
        </>
    );
}

export default RequireFiles;
