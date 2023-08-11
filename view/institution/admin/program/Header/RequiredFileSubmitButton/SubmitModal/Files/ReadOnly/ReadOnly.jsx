import { DownloadIcon } from '@goorm-dev/gds-icons';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import DownloadButton from '@/components/DownloadButton/DownloadButton';

import styles from './ReadOnly.module.scss';

import FormContent from '../../FormContent';

function ReadOnly() {
    const { data: instituionAdmin } = useGetInstitutionAdmin();

    const {
        reports: { fileObject },
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
        </>
    );
}

export default ReadOnly;
