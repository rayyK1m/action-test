import { DownloadIcon } from '@goorm-dev/gds-icons';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './ReadOnly.module.scss';

import FormContent from '../../FormContent';
import useSession from '@/query-hooks/useSession';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { FEEDBACK_TITLE } from './ReadOnly.constants';

function ReadOnly() {
    const { data: userData } = useSession.GET();
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

    const {
        reports: { fileObject, reviewStatus },
    } = instituionAdmin;

    return (
        <>
            {(reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.거절.key ||
                reviewStatus ===
                    REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key) && (
                <FormContent.Box>
                    <FormContent.Box.Title>
                        {FEEDBACK_TITLE[reviewStatus]}
                    </FormContent.Box.Title>
                    <FormContent.Box.Summary>
                        {instituionAdmin.reports?.feedback || '없음'}
                    </FormContent.Box.Summary>
                </FormContent.Box>
            )}
            {Object.entries(fileObject)
                .filter(([_, { filename, url }]) => !!(filename && url))
                .map(([key, { label, filename, url }]) => (
                    <FormContent.Box key={`${key}-readonly`}>
                        <FormContent.Box.Title isRequired>
                            {label}
                        </FormContent.Box.Title>
                        <div>
                            <DownloadButton
                                href={url}
                                filename={filename}
                                icon={<DownloadIcon />}
                                iconSide="right"
                                color="basic"
                                size="lg"
                                outline
                            >
                                {filename}
                            </DownloadButton>
                        </div>
                    </FormContent.Box>
                ))}
        </>
    );
}

export default ReadOnly;
