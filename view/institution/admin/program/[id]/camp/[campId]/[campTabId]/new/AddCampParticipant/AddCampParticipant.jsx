import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BackPageIcon } from '@goorm-dev/gds-icons';
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@goorm-dev/gds-components';

import useSession from '@/query-hooks/useSession';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import { useAddCampParticipants } from '@/query-hooks/useCamps';
import useToggle from '@/hooks/useToggle';
import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import SelectApplicantTable from '@/view/components/SelectApplicantTable';

import { getBreadcrumbs } from './AddCampParticipant.utils';
import { useParticipantsContext } from './context';

import styles from './AddCampParticipant.module.scss';

function AddCampParticipant() {
    const router = useRouter();
    const { id: programId, campId } = router.query;

    const [selectedStudents, setSelectedStudents] = useState({});
    const [isOpenModal, toggleModal] = useToggle();

    const { data: userData } = useSession.GET();
    const { data: program } = useGetProgramAdmin(programId);
    const addParticipants = useAddCampParticipants(
        `/institution/admin/program/${programId}/camp/${campId}/participants`,
    );
    const { participantsCount, updateParticipantsCount } =
        useParticipantsContext();

    const handleAddParticipants = () => {
        toggleModal();
        const selecedCampTickets = Object.values(selectedStudents).map(
            (students) => students.map((student) => student.id),
        );

        if (selecedCampTickets.length === 0) {
            return;
        }

        addParticipants.mutate({ campId, targets: selecedCampTickets.flat() });
    };

    return (
        <>
            <Layout>
                <Layout.Header userData={userData} />
                <Layout.Main>
                    <GridContainer className={styles.container}>
                        <PageHeader>
                            <PageHeader.Title>
                                <PageHeader.Breadcrumb
                                    breadcrumbs={getBreadcrumbs(
                                        program,
                                        campId,
                                    )}
                                />
                                <div className="d-flex align-items-center">
                                    <Button
                                        color="link"
                                        tag={Link}
                                        href={`/institution/admin/program/${program.id}/camp/${campId}/participants`}
                                        className="d-flex justify-content-center mr-2"
                                        icon={<BackPageIcon />}
                                    />
                                    <h3>참가자 추가하기</h3>
                                </div>
                            </PageHeader.Title>
                        </PageHeader>

                        <Card>
                            <CardBody>
                                <SelectApplicantTable
                                    onSelectedRowChange={setSelectedStudents}
                                    onApplicantCountChange={
                                        updateParticipantsCount
                                    }
                                />
                            </CardBody>
                            {participantsCount !== 0 && (
                                <CardFooter className="d-flex">
                                    <Button
                                        size="xl"
                                        color="primary"
                                        className="ml-auto"
                                        onClick={toggleModal}
                                    >
                                        추가하기
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    </GridContainer>
                </Layout.Main>
            </Layout>

            <Modal isOpen={isOpenModal} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>참가자 추가하기</ModalHeader>
                <ModalBody>
                    선택한 신청자를 캠프 참가자로 추가하시겠어요?
                </ModalBody>
                <ModalFooter>
                    <Button size="lg" color="link" onClick={toggleModal}>
                        취소
                    </Button>
                    <Button
                        size="lg"
                        color="primary"
                        onClick={handleAddParticipants}
                    >
                        추가하기
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AddCampParticipant;
