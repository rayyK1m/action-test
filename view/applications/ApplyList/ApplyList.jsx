import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    BasicPagination,
} from '@goorm-dev/gds-components';

import useToggle from '@/hooks/useToggle';
import useQueryParam from '@/hooks/useQueryParam';
import { useGetCampTickets } from '@/query-hooks/uesCampTickets';
import GridContainer from '@/components/GridContainer';
import ListItem from '@/view/applications/ListItem/ListItem.jsx';
import { DROPDOWN_MENU } from './ApplyList.constants';

import styles from './ApplyList.module.scss';

const CURRENT_URL = '/applications';
const EMPTY_IMAGE = 'https://statics.goorm.io/images/gds/empty_folder.svg';

const EmptyList = ({ text }) => {
    return (
        <div className={styles.emptyContainer}>
            <Image
                src={EMPTY_IMAGE}
                alt="empty view"
                width={160}
                height={120}
            />
            <div className="text-gray-800 mt-2">{text}</div>
        </div>
    );
};
function ApplyList() {
    const router = useRouter();
    const [isOpen, toggle] = useToggle();
    const [dropdownSelect, setDropdownSelect] = useState(0);

    const page = useQueryParam({
        key: 'page',
        defaultValue: 1,
    });

    const {
        data: { campTickets, totalCount },
    } = useGetCampTickets({
        page,
        ...(dropdownSelect !== 0 && {
            reviewStatus: DROPDOWN_MENU[dropdownSelect].value,
        }),
    });

    const isEmpty = useMemo(() => totalCount === 0, [totalCount]);
    return (
        <GridContainer colProps={{ xs: { size: 10, offset: 1 } }}>
            {/* header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h6>
                    신청 내역{' '}
                    <span
                        className={
                            totalCount === 0 ? 'text-gray-600' : 'text-blue-500'
                        }
                    >
                        {totalCount}
                    </span>
                </h6>

                <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle size="lg" color="link" theme="light" caret>
                        {DROPDOWN_MENU[dropdownSelect].text}
                    </DropdownToggle>

                    <DropdownMenu>
                        {DROPDOWN_MENU.map((item, idx) => (
                            <DropdownItem
                                key={item.key}
                                onClick={() => {
                                    setDropdownSelect(idx);
                                    router.push(
                                        {
                                            pathname: CURRENT_URL,
                                            query: {
                                                page: 1,
                                            },
                                        },
                                        undefined,
                                        { shallow: true },
                                    );
                                }}
                            >
                                {item.text}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            </div>

            {/* list content */}
            {isEmpty ? (
                <EmptyList
                    text={
                        dropdownSelect === 0
                            ? '신청한 프로그램이 없습니다.'
                            : '해당하는 프로그램이 없습니다.'
                    }
                />
            ) : (
                <>
                    <div className={styles.item}>
                        {campTickets.map((campTicket) => (
                            <ListItem key={campTicket.id} data={campTicket} />
                        ))}
                    </div>

                    {/* footer */}
                    <div className="w-100 d-flex justify-content-center">
                        <BasicPagination
                            page={page}
                            pageCount={Math.ceil(totalCount / 5)}
                            limitCount={5}
                            onPageChangeHandler={(selectedPage) => {
                                router.push(
                                    {
                                        pathname: CURRENT_URL,
                                        query: {
                                            page: selectedPage,
                                        },
                                    },
                                    undefined,
                                    { shallow: true },
                                );
                            }}
                        />
                    </div>
                </>
            )}
        </GridContainer>
    );
}

export default ApplyList;
