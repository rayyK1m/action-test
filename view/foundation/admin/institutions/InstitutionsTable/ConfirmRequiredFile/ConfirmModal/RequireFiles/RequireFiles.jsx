import { useContext } from 'react';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';

import { ConfirmModalContext } from '../ConfirmModal';
import FormContent from '../FormContent';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './RequireFiles.module.scss';
import { Input } from '@goorm-dev/gds-components';
import { FEEDBACK_SHOW_MAP, FEEDBACK_TITLE } from './RequireFiles.constants';

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
                        <FormContent.Box.Title>{label}</FormContent.Box.Title>
                        <div>
                            <DownloadButton
                                size="md"
                                href={url}
                                filename={filename}
                            >
                                {filename}
                            </DownloadButton>
                        </div>
                    </FormContent.Box>
                ))}
            {FEEDBACK_SHOW_MAP[submitFileStatus] && (
                <FormContent.Box>
                    <FormContent.Box.Title>
                        {FEEDBACK_TITLE[submitFileStatus]}
                    </FormContent.Box.Title>
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
