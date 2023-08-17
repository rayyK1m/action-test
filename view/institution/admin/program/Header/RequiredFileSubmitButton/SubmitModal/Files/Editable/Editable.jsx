import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import useSession from '@/query-hooks/useSession';
import { FileInputItem } from '@/view/components/ValidateFormItem';

import styles from './Editable.module.scss';

function Editable() {
    const { data: userData } = useSession.GET();
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

    const {
        reports: { fileObject },
    } = instituionAdmin;

    return (
        <>
            {Object.entries(fileObject).map(
                ([key, { label, filename, url }]) => {
                    return (
                        <FileInputItem
                            key={`${key}-editable`}
                            fileKey={key}
                            label={label}
                            isRequired
                            maxFileSize={30}
                            defaultValue={{ filename, url }}
                        />
                    );
                },
            )}
        </>
    );
}

export default Editable;
