import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from '@goorm-dev/gds-components';
import {
    BackPageIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EditIcon,
    UserIcon,
} from '@goorm-dev/gds-icons';

import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import useStepLayout from '@/hooks/useStepLayout';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import { getBreadcrumbs } from './CreateCampContainer.utils';
import { useCreateCampSubmitActionContext } from './context';
import SelectStudent from '../SelectStudent';
import InfoInputForm from '../InfoInputForm/InfoInputForm';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@goorm-dev/gds-components/dist/cjs';
import useToggle from '@/hooks/useToggle';

// FIXME: 적절한 컴포넌트로 변경 필요
const STEP_ITEMS = [
    {
        key: 'campInfo',
        icon: EditIcon,
        text: '정보 입력',
    },
    {
        key: 'selectStudent',
        icon: UserIcon,
        text: '학생 선택',
    },
];
const STEP_CARDS = [InfoInputForm, SelectStudent];

function CreateCampContainer() {
    const router = useRouter();
    const { id } = router.query;
    const { stepIndex, prev, next, StepLayout } = useStepLayout(STEP_ITEMS);
    const { submit } = useCreateCampSubmitActionContext();
    const { data: program } = useGetProgramAdmin(id);

    const [isModalOpen, toggleModal] = useToggle(false);

    const handleSubmit = () => {
        submit();
        toggleModal(false);
    };

    const isFirst = useMemo(() => stepIndex === 0, [stepIndex]);
    const isLast = useMemo(
        () => stepIndex === STEP_ITEMS.length - 1,
        [stepIndex],
    );

    const StepComponent = STEP_CARDS[stepIndex];
    return (
        <GridContainer fluid="xxl" colProps={{ xs: { size: 10, offset: 1 } }}>
            <PageHeader>
                <PageHeader.Title>
                    <PageHeader.Breadcrumb
                        breadcrumbs={getBreadcrumbs(program)}
                    />
                    <div className="d-flex align-items-center">
                        <Button
                            color="link"
                            tag={Link}
                            href={'/institution/admin'}
                            className="d-flex justify-content-center mr-2"
                            icon={<BackPageIcon />}
                        />
                        <h3>캠프 생성하기</h3>
                    </div>
                </PageHeader.Title>
                <PageHeader.Description>
                    정보 입력 및 캠프에 참여할 학생을 선택하지 않아도 캠프를
                    생성할 수 있습니다.
                </PageHeader.Description>
            </PageHeader>

            <Card className="mt-4">
                <CardHeader>
                    <StepLayout />
                </CardHeader>
                <CardBody>
                    <StepComponent />
                </CardBody>
                <CardFooter className="d-flex">
                    {!isFirst && (
                        <Button
                            size="xl"
                            color="link"
                            icon={<ChevronLeftIcon />}
                            onClick={prev}
                        >
                            이전
                        </Button>
                    )}
                    {!isLast && (
                        <Button
                            size="xl"
                            color="primary"
                            className="ml-auto"
                            iconSide="right"
                            icon={<ChevronRightIcon />}
                            onClick={next}
                        >
                            다음
                        </Button>
                    )}
                    {isLast && (
                        <Button
                            size="xl"
                            color="primary"
                            className="ml-auto"
                            onClick={toggleModal}
                        >
                            캠프 생성하기
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Modal isOpen={isModalOpen} toggle={toggleModal} size="md" centered>
                <ModalHeader>캠프 생성하기</ModalHeader>
                <ModalBody>캠프를 생성하시겠어요?</ModalBody>
                <ModalFooter>
                    <Button size="lg" onClick={toggleModal} color="link">
                        취소
                    </Button>
                    <Button size="lg" color="primary" onClick={handleSubmit}>
                        캠프 생성하기
                    </Button>
                </ModalFooter>
            </Modal>
        </GridContainer>
    );
}
export default CreateCampContainer;
