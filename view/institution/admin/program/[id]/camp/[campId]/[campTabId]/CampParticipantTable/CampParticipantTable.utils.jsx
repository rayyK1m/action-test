import React, { useRef } from 'react';
import { cellHelper } from '@goorm-dev/gds-tables';
import {
    Button,
    Tooltip,
    Modal,
    ModalBody,
    ModalFooter,
    ButtonDropdown,
    DropdownToggle,
} from '@goorm-dev/gds-components';
import { InfoCircleIcon, OutIcon } from '@goorm-dev/gds-icons';

import { getTargetGroupString, ellipsisedString } from '@/utils';

import useHover from '@/hooks/useHover';

import useToggle from '@/hooks/useToggle';
import { ModalHeader } from '@goorm-dev/gds-components/dist/cjs';
import {
    useDeleteCampParticipants,
    useGetCampClasses,
} from '@/query-hooks/useCamps';
import { useMoveCampTickets } from '@/query-hooks/uesCampTickets';
import TableDropdownPortal from '@/components/TableDropdownPortal';
import CustomDropdownMenu from '@/components/CustomDropdownMenu';
import CustomDropdownItem from '@/components/CustomDropdownItem';

import styles from './CampParticipantTable.module.scss';
import ApplicantTicketInfoPannel from '../../../../applicant/ApplicantTicketInfoPannel/ApplicantTicketInfoPannel';

const ClassDropdown = ({ camp, campTicket }) => {
    const { programId, id: campId, class: campClass } = camp;
    const { id: campTicketId, userName } = campTicket;
    const selectedClass = useRef(null);

    const [isOpen, toggle] = useToggle();
    const [isModalOpen, toggleModal] = useToggle();

    const { data: classes, isLoading } = useGetCampClasses(programId);
    const moveClass = useMoveCampTickets();

    if (isLoading) {
        return (
            <Button color="link" caret>
                {campClass} 분반
            </Button>
        );
    }
    return (
        <>
            <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle color="link" caret>
                    {campClass}분반
                </DropdownToggle>
                <TableDropdownPortal>
                    <CustomDropdownMenu>
                        {classes.map((item) => {
                            return (
                                <CustomDropdownItem
                                    key={item.id}
                                    onClick={() => {
                                        selectedClass.current = {
                                            id: item.id,
                                            class: item.class,
                                        };
                                        toggleModal();
                                    }}
                                >
                                    {item.class}분반
                                </CustomDropdownItem>
                            );
                        })}
                    </CustomDropdownMenu>
                </TableDropdownPortal>
            </ButtonDropdown>

            {selectedClass.current && (
                <Modal isOpen={isModalOpen} toggle={toggleModal} centered>
                    <ModalHeader toggle={toggleModal}>
                        분반 변경하기
                    </ModalHeader>
                    <ModalBody>
                        {`'${userName}' 참가자를 [${campClass}] 분반에서 [${selectedClass.current.class}] 분반으로 변경하시겠어요?`}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="lg" color="link" onClick={toggleModal}>
                            취소
                        </Button>
                        <Button
                            size="lg"
                            color="primary"
                            onClick={() => {
                                moveClass.mutate({
                                    originCampId: campId,
                                    newCampId: selectedClass.current.id,
                                    targets: [campTicketId],
                                    meta: {
                                        userName,
                                        newClass: selectedClass.current.class,
                                    },
                                });
                                toggleModal();
                            }}
                        >
                            변경하기
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </>
    );
};
const MemoizedClassDropdown = React.memo(ClassDropdown);

export const getTableColums = (camp, isFoundationPage) => {
    return [
        {
            accessorKey: 'class',
            header: <>분반</>,
            cell: cellHelper(({ rowData }) =>
                isFoundationPage ? (
                    <div>{camp.class}분반</div>
                ) : (
                    <MemoizedClassDropdown camp={camp} campTicket={rowData} />
                ),
            ),
            size: 120,
            minSize: 120,
        },
        {
            accessorKey: 'userName',
            header: <div>이름</div>,
            cell: cellHelper(({ value }) => {
                const [nameRef, isHover] = useHover();
                const needEllipsis = value.length > 5;
                return (
                    <>
                        <div className="d-flex" ref={nameRef}>
                            {ellipsisedString(value, 5)}
                        </div>
                        <Tooltip
                            target={nameRef}
                            isOpen={needEllipsis && isHover}
                            placement="bottom-start"
                        >
                            {value}
                        </Tooltip>
                    </>
                );
            }),
            size: 119,
            maxSize: 119,
            enableSorting: true,
        },
        {
            accessorKey: 'operateLocation',
            header: <div>신청 지역</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 139,
        },
        {
            accessorKey: 'targetGroup',
            header: <div>신청 대상</div>,
            cell: cellHelper(({ value }) => {
                const { elementarySchool, middleSchool, highSchool } = value;
                const [targetGroupRef, isHover] = useHover();
                const targetString = getTargetGroupString(
                    elementarySchool,
                    middleSchool,
                    highSchool,
                );
                const needEllipsis = targetString.length > 15;

                return (
                    <>
                        <div
                            className={styles.targetGroup}
                            ref={targetGroupRef}
                        >
                            {targetString}
                        </div>
                        <Tooltip
                            target={targetGroupRef}
                            isOpen={needEllipsis && isHover}
                            placement="bottom-start"
                        >
                            {targetString}
                        </Tooltip>
                    </>
                );
            }),
            size: 168,
            maxSize: 248,
        },
        {
            accessorKey: 'schoolName',
            header: <div>소속 학교</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 310,
            maxSize: 450,
        },
        {
            accessorKey: 'phoneNumber',
            header: <div>연락처</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 145,
        },
        {
            accessorKey: 'viewDetail',
            header: <></>,
            cell: cellHelper(({ rowData }) => {
                const [isOpen, toggle] = useToggle(false);
                return (
                    <>
                        <Button color="link" onClick={toggle}>
                            신청 정보 확인
                        </Button>
                        <ApplicantTicketInfoPannel
                            isOpen={isOpen}
                            onClose={() => toggle(false)}
                            ticketId={rowData.id}
                            title="캠프 참가자"
                        />
                    </>
                );
            }),
            size: 154,
            minSize: 154,
        },
        !isFoundationPage && {
            accessorKey: 'kick',
            header: <></>,
            cell: cellHelper(({ rowData }) => {
                const [isOpen, toggle] = useToggle();
                const deleteParticipants = useDeleteCampParticipants();
                return (
                    <>
                        <Button
                            color="link"
                            icon={<OutIcon />}
                            onClick={toggle}
                        >
                            퇴장
                        </Button>
                        <Modal isOpen={isOpen} toggle={toggle} centered>
                            <ModalHeader toggle={toggle} />
                            <ModalBody className={styles.modalBody}>
                                <InfoCircleIcon
                                    className="text-red-500"
                                    width="100"
                                    height="100"
                                />
                                <div className={styles.modalText}>
                                    <h5>참가자를 퇴장시키시겠어요?</h5>
                                    <div>
                                        <p>
                                            ‘<b>{rowData.userName}</b>’ 참가자를
                                            캠프 참가자 목록에서 삭제합니다.
                                        </p>
                                        <p>
                                            참가자 퇴장이 완료되면 데이터를
                                            되돌릴 수 없습니다.
                                        </p>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="link" size="lg" onClick={toggle}>
                                    취소
                                </Button>
                                <Button
                                    color="danger"
                                    size="lg"
                                    onClick={() => {
                                        deleteParticipants.mutate({
                                            campId: camp.id,
                                            targets: [rowData.id],
                                            meta: {
                                                userName: rowData.userName,
                                            },
                                        });
                                        toggle();
                                    }}
                                >
                                    퇴장
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                );
            }),
            size: 154,
            minSize: 154,
        },
    ].filter(Boolean);
};
