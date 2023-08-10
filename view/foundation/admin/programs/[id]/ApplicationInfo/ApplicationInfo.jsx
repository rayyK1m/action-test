import { useRouter } from 'next/router';

import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import Content from '../Content';
import Grade from './Grade';

import { GRADE_MAP } from './ApplicationInfo.constants';
import styles from './ApplicationInfo.module.scss';

function ApplicationInfo() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <Content.Container>
            <Content.Container.Title>신청 정보</Content.Container.Title>
            <Content.Wrapper>
                <Content.Box>
                    <Content.Box.Title>신청 기간</Content.Box.Title>
                    <Content.Box.DateInfo {...program.applyDate} />
                </Content.Box>
                <Content.Box>
                    <Content.Box.Title>신청 가능 대상</Content.Box.Title>
                    <div className={styles.targetGroupContainer}>
                        {Object.entries(program.targetGroup).map(
                            ([type, approveList]) => (
                                <div
                                    key={type}
                                    className={styles.targetGroupWrapper}
                                >
                                    <span className={styles.targetGroupTitle}>
                                        {GRADE_MAP[type]}
                                    </span>
                                    <div
                                        className={styles.targetGroupDivider}
                                    />
                                    <Grade
                                        type={type}
                                        approveList={approveList}
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </Content.Box>
            </Content.Wrapper>
        </Content.Container>
    );
}

export default ApplicationInfo;
