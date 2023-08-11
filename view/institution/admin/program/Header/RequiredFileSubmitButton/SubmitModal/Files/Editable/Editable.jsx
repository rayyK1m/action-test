import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import { FileInputItem } from '@/view/components/ValidateFormItem';

import styles from './Editable.module.scss';

function Editable() {
    const { data: instituionAdmin } = useGetInstitutionAdmin();

    const {
        reports: { fileObject },
    } = instituionAdmin;

    return (
        <>
            {Object.entries(fileObject).map(([key, { label, name, url }]) => {
                return (
                    <FileInputItem
                        key={`${key}-editable`}
                        fileKey={key}
                        label={label}
                        isRequired
                        maxFileSize={30}
                        defaultValue={{
                            filename: name,
                            url,
                        }}
                    />
                );
            })}
        </>
    );
}

export default Editable;
