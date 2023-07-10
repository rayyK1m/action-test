import { Button } from '@goorm-dev/gds-components';

import styles from './ApplyButton.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ApplyButton = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className={styles.container}>
            <Button
                tag={Link}
                href={`/applications/${id}/new`}
                size="xl"
                color="primary"
                block
            >
                신청하기
            </Button>
        </div>
    );
};

export default ApplyButton;
