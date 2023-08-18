import PageHeader from '@/components/PageHeader';
import { Skeleton, Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider';
import styles from './ProgramInfoHeader.module.scss';

function ProgramInfoHeaderLoading() {
    return (
        <PageHeader useHrTag={true}>
            <PageHeader.Title>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <Button
                            color="link"
                            className="mr-2"
                            icon={<BackPageIcon />}
                        />
                        <Skeleton width="12.5rem" height="1.25rem" />
                    </div>
                    <div className={styles.guideContainer}>
                        <div className={styles.guideText}>
                            <Skeleton width="5rem" height="1.25rem" />
                            <Divider height="1rem" />
                            <Skeleton width="5rem" height="1.25rem" />
                            <Divider height="1rem" />
                            <Skeleton
                                width="5rem"
                                height="1.25rem"
                                className="mr-4"
                            />
                        </div>
                        <Skeleton width="7.5rem" height="2.5rem" />
                    </div>
                </div>
            </PageHeader.Title>
        </PageHeader>
    );
}

export default ProgramInfoHeaderLoading;
