import { DownloadIcon } from '@goorm-dev/gds-icons';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './ReadOnly.module.scss';

import FormContent from '../../FormContent';
import useSession from '@/query-hooks/useSession';

function ReadOnly() {
    const { data: userData } = useSession.GET();
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

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
