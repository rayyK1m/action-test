import React from 'react';
import Link from 'next/link';

import { Dropdown, DropdownToggle, Button } from '@goorm-dev/gds-components';
import { OpenfileIcon, PlusIcon } from '@goorm-dev/gds-icons';

import useToggle from '@/hooks/useToggle';
import PageHeader from '@/components/PageHeader';
import CustomDropdownMenu from '@/components/CustomDropdownMenu';
import CustomDropdownItem from '@/components/CustomDropdownItem';
import SubmitModal from '../SubmitModal/SubmitModal';

function Header({ isSubmitted }) {
    const [isOpenModal, toggleModal] = useToggle();
    const [isOpenDropdown, toggleDropdown] = useToggle();

    return (
        <>
            <PageHeader useHrTag={true}>
                <PageHeader.Title className="d-flex justify-content-between">
                    <h3>프로그램 관리</h3>

                    <div className="d-flex">
                        <Button
                            size="lg"
                            color={isSubmitted ? 'basic' : 'primary'}
                            outline
                            icon={<OpenfileIcon />}
                            onClick={toggleModal}
                        >
                            {isSubmitted
                                ? '필수 자료 제출 내역'
                                : '필수 자료 제출 하기'}
                        </Button>

                        <Dropdown
                            isOpen={isOpenDropdown}
                            toggle={toggleDropdown}
                        >
                            <DropdownToggle
                                size="lg"
                                color="primary"
                                className="d-flex align-items-center ml-2"
                            >
                                <PlusIcon className="mr-2" />새 프로그램
                                등록하기
                            </DropdownToggle>
                            <CustomDropdownMenu className="w-100" right>
                                <Link
                                    href={{
                                        pathname:
                                            '/institution/admin/program/new',
                                        query: {
                                            type: '방문형',
                                        },
                                    }}
                                >
                                    <CustomDropdownItem>
                                        방문형
                                    </CustomDropdownItem>
                                </Link>
                                <Link
                                    href={{
                                        pathname:
                                            '/institution/admin/program/new',
                                        query: {
                                            type: '집합형',
                                        },
                                    }}
                                >
                                    <CustomDropdownItem>
                                        집합형
                                    </CustomDropdownItem>
                                </Link>
                            </CustomDropdownMenu>
                        </Dropdown>
                    </div>
                </PageHeader.Title>

                <PageHeader.Description>
                    프로그램 등록 후 재단의 승인을 받으면 신청자는 신청
                    페이지에서 해당 프로그램을 볼 수 있습니다.
                </PageHeader.Description>
            </PageHeader>

            <SubmitModal
                isOpen={isOpenModal}
                toggle={toggleModal}
                isSubmitted={isSubmitted}
            />
        </>
    );
}

export default Header;
