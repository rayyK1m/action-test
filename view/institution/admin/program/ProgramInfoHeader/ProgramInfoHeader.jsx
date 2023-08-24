import { useRouter } from 'next/router';
import cn from 'classnames';

import PageHeader from '@/components/PageHeader';
import { getBreadcrumbs } from './ProgramInfoHeader.utils';

import { Button, TextButton, Tooltip } from '@goorm-dev/gds-components';
import {
    EditIcon,
    BackPageIcon,
    ChevronRightIcon,
    SubmitModeIcon,
} from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider';
import styles from './ProgramInfoHeader.module.scss';
import { slugify } from '@/utils';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';
import useHover from '@/hooks/useHover';

function ProgramInfoHeader({ program, isEdit, setIsEdit }) {
    const router = useRouter();
    const currentPath = router.asPath;
    const [buttonRef, isHover] = useHover();

    const handlePushLecturePage = () => {
        router.push(
            `${process.env.SWCAMP_CONTENTS_CHANNEL}/v2/teach/lecture/${
                program.lectureSequence
            }/${slugify(program.name)}`,
        );
    };

    const handlePushApplicantPage = () => {
        router.push(`${currentPath}/applicant`);
    };

    const handlePushCampMangePage = () => {
        router.push(`${currentPath}/camp?division=${program.type.division}`);
    };

    const isReviewInProgress =
        program.reviewStatus === PROGRAM_REVIEW_STATUS.심사중.value;
    const isReviewApprove =
        program.reviewStatus === PROGRAM_REVIEW_STATUS.승인.value;

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
                        <h3 className="d-inline">{program.name}</h3>
                    </div>
                    <div className={styles.guideContainer}>
                        <div
                            className={cn(
                                styles.guideText,
                                !isReviewApprove && styles.disabledText,
                            )}
                        >
                            <div className="d-flex align-items-center">
                                <span className="mr-2 text-gray-700">
                                    신청자
                                </span>
                                <TextButton
                                    icon={ChevronRightIcon}
                                    iconSide="right"
                                    color="dark"
                                    size="md"
                                    className={cn(
                                        styles.boldText,
                                        styles.textButton,
                                    )}
                                    onClick={handlePushApplicantPage}
                                >
                                    {program.campTicketCount}개
                                </TextButton>
                            </div>
                            <Divider height="1rem" />
                            <div className="d-flex align-items-center">
                                <span className="mr-2 text-gray-700">캠프</span>
                                <TextButton
                                    icon={ChevronRightIcon}
                                    iconSide="right"
                                    color="dark"
                                    size="md"
                                    className={cn(
                                        styles.boldText,
                                        styles.textButton,
                                    )}
                                    onClick={handlePushCampMangePage}
                                >
                                    {program.campCount}개
                                </TextButton>
                            </div>
                            <Divider height="1rem" />
                            <div className="d-flex align-items-center">
                                <span className="mr-2 text-gray-700">
                                    콘텐츠
                                </span>
                                <TextButton
                                    icon={SubmitModeIcon}
                                    iconSide="right"
                                    color="dark"
                                    size="md"
                                    className={cn(
                                        styles.boldText,
                                        styles.textButton,
                                    )}
                                    onClick={handlePushLecturePage}
                                >
                                    바로가기
                                </TextButton>
                            </div>
                        </div>
                        {!isEdit && (
                            <>
                                <div ref={buttonRef}>
                                    <Button
                                        icon={<EditIcon />}
                                        color="link"
                                        size="lg"
                                        onClick={() => setIsEdit(true)}
                                        disabled={!isReviewApprove}
                                    >
                                        수정하기
                                    </Button>
                                </div>
                                <Tooltip
                                    target={buttonRef}
                                    isOpen={isReviewInProgress && isHover}
                                    placement="top"
                                >
                                    심사 중인 프로그램은 내용 수정이
                                    불가능합니다.
                                </Tooltip>
                            </>
                        )}
                    </div>
                </div>
            </PageHeader.Title>
        </PageHeader>
    );
}

export default ProgramInfoHeader;
