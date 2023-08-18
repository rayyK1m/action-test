import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import styles from './BackButton.module.scss';
import Image from 'next/image';

function BackButton() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <div className={styles.container}>
            <Button
                size="md"
                color="link"
                tag={Link}
                href="/foundation/admin/programs"
                icon={<BackPageIcon />}
                className={styles.button}
            />
            <div className={styles.contentWrapper}>
                <h3>{program.name}</h3>
                <div className={styles.institutionWrapper}>
                    <Image
                        src={program.institution.logo.url}
                        alt="institution"
                        width={24}
                        height={24}
                        className={styles.logo}
                    />
                    {program.institution?.name || '기관명'}
                </div>
            </div>
        </div>
    );
}

export default BackButton;
