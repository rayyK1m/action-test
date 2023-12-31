import { Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import useProgram from '@/query-hooks/useProgram';
import { useRouter } from 'next/router';

import styles from './InstitutionInfo.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_AVATAR_IMAGE_LG } from '@/constants/common';

function InstitutionInfo() {
    const router = useRouter();
    const { id } = router.query;
    const {
        data: { item: programData },
    } = useProgram.GET({
        type: 'detail',
        id,
    });

    return (
        <div className={styles.container}>
            <Image
                className={styles.image}
                src={
                    programData.institution.logo?.url || DEFAULT_AVATAR_IMAGE_LG
                }
                width={80}
                height={80}
                alt={programData.institution.name}
                loading="lazy"
            />
            <div className={styles.content}>
                <h5>{programData.institution.name}</h5>
                <Button
                    tag={Link}
                    href={`/institutions/${programData.institution.id}`}
                    outline
                    color="basic"
                    iconSide="right"
                    icon={<ChevronRightIcon />}
                >
                    프로그램 더보기
                </Button>
            </div>
        </div>
    );
}

export default InstitutionInfo;
