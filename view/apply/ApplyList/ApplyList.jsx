import React, { useState } from 'react';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    BasicPagination,
} from '@goorm-dev/gds-components';

import ListItem from '@/view/apply/ListItem/ListItem.jsx';
import useToggle from '@/hooks/useToggle';

import styles from './ApplyList.module.scss';

const mockData = {
    campList: [
        {
            index: 'c_index1',
            uuid: 1,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_usRUB_1677058347843/coverImage.jpg?_=1686883839484',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽',
            applyDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            educationDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            channelIndex: 'goormschool',
            approveStatus: 'ACCEPT', // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index2',
            uuid: 2,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_usRUB_1677058347843/coverImage.jpg?_=1686883839484',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽222',
            applyDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            educationDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            channelIndex: 'edu',
            approveStatus: 'REJECT', // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index3',
            uuid: 3,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽333',
            applyDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            educationDate: {
                start: new Date('2023-06-06 13:00'),
                end: new Date('2023-06-06 13:00'),
            },
            channelIndex: 'goormscholl',
            approveStatus: 'IN_PROGRESS', // 승인 상태 [거절, 심사중, 승인]
        },
    ],
    campType: '방문형', // [방문형, 집합형] - 둘 중에 하나의 종류로만 캠프가 구성될 수 있으므로 BFF에서 함께 넘겨주면 됨
    totalCount: 6,
};

const DROPDOWN_MENU = {
    방문형: [
        {
            index: 0,
            key: 'ALL',
            value: '전체',
        },
        {
            index: 1,
            key: 'IN_PROGRESS',
            value: '심사중',
        },
        {
            index: 2,
            key: 'ACCEPT',
            value: '승인',
        },
        {
            index: 3,
            key: 'REJECT',
            value: '거절',
        },
    ],
    집합형: [
        {
            index: 0,
            key: 'ALL',
            value: '전체',
        },
        {
            index: 1,
            key: 'ACCEPT',
            value: '승인',
        },
        {
            index: 2,
            key: 'REJECT',
            value: '거절',
        },
        {
            index: 3,
            key: 'CANCEL',
            value: '캠프 취소',
        },
    ],
};

function ApplyList() {
    const { campList, campType, totalCount } = mockData;
    const [isOpen, toggle] = useToggle();
    const [dropdownSelect, setDropdownSelect] = useState(0);
    const [page, setPage] = useState(1);

    return (
        <div className={styles.container}>
            {/* header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h6>
                    신청 내역{' '}
                    <span className="text-blue-500">{totalCount}</span>
                </h6>

                <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle size="lg" color="link" theme="light" caret>
                        {DROPDOWN_MENU[campType][dropdownSelect].value}
                    </DropdownToggle>

                    <DropdownMenu>
                        {DROPDOWN_MENU[campType].map((item) => (
                            <DropdownItem
                                key={item.index}
                                onClick={() => setDropdownSelect(item.index)}
                            >
                                {item.value}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            </div>

            {/* list content */}
            <div className={styles.item}>
                {campList.map((camp) => (
                    <ListItem key={camp.index} data={camp} />
                ))}
            </div>

            {/* footer */}
            <div className="w-100 d-flex justify-content-center">
                <BasicPagination
                    page={page}
                    pageCount={Math.ceil(totalCount / 5)}
                    limitCount={5}
                    onPageChangeHandler={() => {
                        setPage((prev) => (prev += 1));
                    }}
                />
            </div>
        </div>
    );
}

export default ApplyList;
