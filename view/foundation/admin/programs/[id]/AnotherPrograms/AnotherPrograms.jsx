import { useGetProgramsAdmin } from '@/query-hooks/usePrograms';
import Content from '../Content';
import styles from './AnotherPrograms.module.scss';
import { ANOTHER_PROGRAMS_QUERY } from './AnotherPrograms.contants';
import Link from 'next/link';
import { Badge, Button, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import { STATUS_BADGE } from '../[id].constants';
import { useRouter } from 'next/router';

function AnotherPrograms() {
    const router = useRouter();
    const { id: programId } = router.query;
    const { data } = useGetProgramsAdmin({ ...ANOTHER_PROGRAMS_QUERY });

    /** NOTE: 현재 백쪽에서 겹치는 프로그램 id를 제외하기에는 공수가 크다고 판단해서 프론트단에서 3개를 불러와서 필터링함 */
    const filterdPrograms = data.programs
        .filter(({ id: currentProgramId }) => currentProgramId !== programId)
        .slice(0, 2);

    if (filterdPrograms.length === 0) {
        return <></>;
    }

    return (
        <Content.Container gap="lg">
            <div className={styles.titleContainer}>
                <Content.Container.Title>
                    심사 중인 프로그램
                </Content.Container.Title>
                <TextButton
                    tag={Link}
                    href={'/foundation/admin/programs?reviewStatus=IN_PROGRESS'}
                    color="dark"
                    size="lg"
                >
                    전체보기
                </TextButton>
            </div>
            <ul className={styles.list}>
                {filterdPrograms.map(
                    ({
                        type: { division, duration },
                        institution,
                        name,
                        id,
                    }) => {
                        return (
                            <li key={id} className={styles.item}>
                                <div className={styles.contents}>
                                    <span className={styles.badges}>
                                        <Badge
                                            size="md"
                                            pill
                                            color={STATUS_BADGE[division].color}
                                        >
                                            {division}
                                        </Badge>
                                        <Badge size="md" pill color="dark">
                                            {duration}
                                        </Badge>
                                    </span>
                                    <span>
                                        <span className="subtitle-1 text-hint mr-2">
                                            {institution.name}
                                        </span>
                                        <Link
                                            href={`/foundation/admin/programs/${id}`}
                                        >
                                            {name}
                                        </Link>
                                    </span>
                                </div>
                                <Button
                                    icon={<ChevronRightIcon />}
                                    iconSide="right"
                                    color="link"
                                    tag={Link}
                                    href={`/foundation/admin/programs/${id}`}
                                >
                                    확인하기
                                </Button>
                            </li>
                        );
                    },
                )}
            </ul>
        </Content.Container>
    );
}

export default AnotherPrograms;
