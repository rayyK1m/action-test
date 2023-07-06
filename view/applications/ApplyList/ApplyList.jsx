import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    BasicPagination,
} from '@goorm-dev/gds-components';

import useToggle from '@/hooks/useToggle';
import useQueryParam from '@/hooks/useQueryParam';
import uesCampTickets from '@/query-hooks/uesCampTickets';
import GridContainer from '@/components/GridContainer';
import ListItem from '@/view/applications/ListItem/ListItem.jsx';
import { DROPDOWN_MENU } from './ApplyList.constants';

import styles from './ApplyList.module.scss';

const CURRENT_URL = '/applications';
function ApplyList() {
    const router = useRouter();
    const [isOpen, toggle] = useToggle();
    const [dropdownSelect, setDropdownSelect] = useState(0);

    const page = useQueryParam({
        key: 'page',
        defaultValue: 1,
    });

    const {
        data: { campTickets, campType, totalCount },
    } = uesCampTickets.GET({
        page,
        ...(dropdownSelect !== 0 && { status: dropdownSelect }),
    });

    return (
        <GridContainer colProps={{ xs: { size: 10, offset: 1 } }}>
            {/* header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h6>
                    신청 내역{' '}
                    <span className="text-blue-500">{totalCount}</span>
                </h6>

                <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                    <DropdownToggle size="lg" color="link" theme="light" caret>
                        {DROPDOWN_MENU[campType][dropdownSelect].text}
                    </DropdownToggle>

                    <DropdownMenu>
                        {DROPDOWN_MENU[campType].map((item) => (
                            <DropdownItem
                                key={item.index}
                                onClick={() => {
                                    setDropdownSelect(item.index);
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
            <div className={styles.item}>
                {campTickets.map((camp) => (
                    <ListItem key={camp.index} data={camp} />
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
        </GridContainer>
    );
}

export default ApplyList;
