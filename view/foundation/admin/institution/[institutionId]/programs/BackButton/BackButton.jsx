import { Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from './BackButton.module.scss';
import Link from 'next/link';
import { useGetProgramsAdmin } from '@/query-hooks/usePrograms';
import { useRouter } from 'next/router';
import useQueryParam from '@/hooks/useQueryParam';

function BackButton() {
    const router = useRouter();
    const page = useQueryParam({
        key: 'page',
        parser: Number,
    });
    const limit = useQueryParam({
        key: 'limit',
        parser: Number,
    });

    const { institutionId, search, sort } = router.query;

    const {
        data: { programs },
    } = useGetProgramsAdmin({
        institutionId,
        page,
        limit,
        search,
        sort,
    });

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
            <h3>{programs[0].institution.name}</h3>
        </div>
    );
}

export default BackButton;
