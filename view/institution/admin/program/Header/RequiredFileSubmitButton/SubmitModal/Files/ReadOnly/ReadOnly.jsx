import { DownloadIcon } from '@goorm-dev/gds-icons';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './ReadOnly.module.scss';

import FormContent from '../../FormContent';
import useSession from '@/query-hooks/useSession';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { Input } from '@goorm-dev/gds-components';

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
            {Object.entries(fileObject)
                .filter(([_, { name, url }]) => !!(name && url))
                .map(([key, { label, name, url }]) => (
                    <FormContent.Box key={`${key}-readonly`}>
                        <FormContent.Box.Title isRequired>
                            {label}
                        </FormContent.Box.Title>
                        <div>
                            <DownloadButton
                                href={url}
                                filename={name}
                                icon={<DownloadIcon />}
                                iconSide="right"
                                color="basic"
                                size="lg"
                                outline
                            >
                                {name}
                            </DownloadButton>
                        </div>
                    </FormContent.Box>
                ))}

            {(reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.거절.key ||
                reviewStatus ===
                    REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key ||
                reviewStatus ===
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

export default ReadOnly;
