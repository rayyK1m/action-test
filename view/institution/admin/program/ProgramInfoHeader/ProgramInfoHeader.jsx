import { useRouter } from 'next/router';

import PageHeader from '@/components/PageHeader';
import { getBreadcrumbs } from './ProgramInfoHeader.utils';

import { Button } from '@goorm-dev/gds-components';
import {
    EditIcon,
    BackPageIcon,
    ChevronRightIcon,
    SubmitModeIcon,
} from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider';
import styles from './ProgramInfoHeader.module.scss';

function ProgramInfoHeader({ program, isEdit, setIsEdit }) {
    const router = useRouter();
    return (
        <PageHeader useHrTag={true}>
            <PageHeader.Title>
                <PageHeader.Breadcrumb breadcrumbs={getBreadcrumbs(program)} />
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            icon={<BackPageIcon />}
                            className="mr-2"
                            color="link"
                            onClick={() => router.push('/institution/admin')}
                        />
                        <h3 className="d-inline">프로그램 정보</h3>
                    </div>
                    <div className={styles.guideContainer}>
                        <div className={styles.guideText}>
                            <div className="d-flex align-items-center">
                                <span className="mr-2">신청자</span>
                                <span className={styles.boldText}>132명</span>
                                <ChevronRightIcon width="1rem" height="1rem" />
                            </div>
                            <Divider height="1rem" />
                            <div className="d-flex align-items-center">
                                <span className="mr-2">신청자</span>
                                <span className={styles.boldText}>32개</span>
                                <ChevronRightIcon width="1rem" height="1rem" />
                            </div>
                            <Divider height="1rem" />
                            <div className="d-flex align-items-center">
                                <span className="mr-2">콘텐츠</span>
                                <span className={styles.boldText}>
                                    바로가기
                                </span>
                                <SubmitModeIcon width="1rem" height="1rem" />
                            </div>
                        </div>
                        {!isEdit && (
                            <Button
                                icon={<EditIcon />}
                                color="link"
                                onClick={() => setIsEdit(true)}
                            >
                                수정하기
                            </Button>
                        )}
                    </div>
                </div>
            </PageHeader.Title>
        </PageHeader>
    );
}

export default ProgramInfoHeader;
