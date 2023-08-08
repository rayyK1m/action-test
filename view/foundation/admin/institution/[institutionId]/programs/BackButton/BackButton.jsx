import { Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from './BackButton.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetInstitution } from '@/query-hooks/useInstitutions';

function BackButton() {
    const router = useRouter();
    const { institutionId } = router.query;
    const { data: institution } = useGetInstitution(institutionId);

    return (
        <div className={styles.container}>
            <Button
                size="md"
                color="link"
                tag={Link}
                href="/foundation/admin/institutions"
                icon={<BackPageIcon />}
                className={styles.button}
            />
            <h3>{institution.name}</h3>
        </div>
    );
}

export default BackButton;
