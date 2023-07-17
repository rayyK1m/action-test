import { useState } from 'react';
import cn from 'classnames';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    SearchInput,
    Nav,
    NavItem,
    NavLink,
    TextButton,
    Badge,
} from '@goorm-dev/gds-components';
import { CloseIcon, RefreshIcon } from '@goorm-dev/gds-icons';

import GridContainer from '@/components/GridContainer';
import SSRSuspense from '@/components/SSRSuspense';
import { PROGRAM_DIVISION } from '@/constants/db';
import {
    PROGRAM_CATEGORIES,
    PROGRAM_OPERATION_LOCATIONS,
} from '@/constants/db';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';

import ProgramsCards from '../ProgramsCards';
import ProgramsCardsLoading from '../ProgramsCards/ProgramsCards.loading';
import { DROP_DOWNS } from './ProgramsContainer.constants';

import styles from './ProgramsContainer.module.scss';

export default function ProgramsContainer() {
    /** drpodown value 값들 */
    const [dropdowns, setDropdowns] = useState({
        [DROP_DOWNS.LOCATIONS]: '',
        [DROP_DOWNS.CATEGORIES]: '',
    });

    /** 운영지역 dropdown open 여부 */
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

    /** 카테고리 dropdown open 여부 */
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    /** 프로그램 이름 검색 */
    const [inputValue, setInputValue] = useState(''); // input onChange value
    const [searchValue, setSearchValue] = useState(''); // input onKeypress 'Enter' value

    /** 방문형, 집합형 선택 */
    const [campType, setCampType] = useState(PROGRAMS_DEFAULT_QUERY.campType);

    /** Pagination 관련 */
    const [page, setPage] = useState(PROGRAMS_DEFAULT_QUERY.page);

    const handleDropdown = (e) => {
        const { type, value } = e.target.dataset;

        setDropdowns({
            ...dropdowns,
            [type]: value,
        });
    };
    const handleNavLink = (e) => {
        const { id } = e.target.dataset;
        setCampType(id);
        setPage(1);
    };
    const handleFilterList = (e) => {
        const { id = '' } = e.target.dataset;

        if (id) {
            /** 뱃지 Close 버튼 클릭 */
            setDropdowns({
                ...dropdowns,
                [id]: '',
            });
        } else {
            /** 필터 초기화 */
            const tempFilterList = {};
            for (const key in dropdowns) {
                tempFilterList[key] = '';
            }
            setDropdowns(tempFilterList);
        }
    };

    return (
        <GridContainer>
            <section className="d-flex align-items-center justify-content-between mb-4">
                <ul className={cn('d-flex', styles.dropdowns)}>
                    <li>
                        <ButtonDropdown
                            isOpen={isLocationDropdownOpen}
                            toggle={() =>
                                setIsLocationDropdownOpen((prev) => !prev)
                            }
                        >
                            <DropdownToggle caret color="link">
                                운영 지역
                            </DropdownToggle>
                            <DropdownMenu>
                                {PROGRAM_OPERATION_LOCATIONS.map((location) => (
                                    <DropdownItem
                                        data-type={DROP_DOWNS.LOCATIONS}
                                        data-value={location}
                                        key={location}
                                        onClick={handleDropdown}
                                    >
                                        {location}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </li>
                    <li>
                        <ButtonDropdown
                            isOpen={isCategoryDropdownOpen}
                            toggle={() =>
                                setIsCategoryDropdownOpen((prev) => !prev)
                            }
                        >
                            <DropdownToggle caret color="link">
                                카테고리
                            </DropdownToggle>
                            <DropdownMenu>
                                {PROGRAM_CATEGORIES.map((location) => (
                                    <DropdownItem
                                        data-type={DROP_DOWNS.CATEGORIES}
                                        data-value={location}
                                        key={location}
                                        onClick={handleDropdown}
                                    >
                                        {location}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </li>
                </ul>

                <SearchInput
                    size="lg"
                    placeholder="프로그램 이름을 검색해보세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') setSearchValue(e.target.value);
                    }}
                    onCancelClick={() => {
                        setInputValue('');
                        setSearchValue('');
                    }}
                    className={styles.searchInput}
                />
            </section>

            {Object.values(dropdowns).some((i) => i !== '') && (
                <section
                    className={cn(
                        styles.filterList,
                        'd-flex mb-3 bg-gray-400-transparent-8',
                    )}
                >
                    <TextButton
                        icon={RefreshIcon}
                        color="link"
                        className="text-info px-0 mr-3"
                        onClick={handleFilterList}
                    >
                        초기화
                    </TextButton>

                    {Object.keys(dropdowns)
                        .filter((key) => dropdowns[key])
                        .map((key) => (
                            <Badge
                                key={key}
                                size="md"
                                color="primary"
                                className={styles.filterDeleteBadge}
                            >
                                {dropdowns[key]}
                                <CloseIcon
                                    data-id={key}
                                    className={styles.filterDeleteButton}
                                    onClick={handleFilterList}
                                />
                            </Badge>
                        ))}
                </section>
            )}

            <section className="mb-4">
                <Nav tabs className={styles.navTabs}>
                    <NavItem className={styles.navItem}>
                        <NavLink
                            tag="span"
                            data-id={PROGRAM_DIVISION.방문형}
                            className={styles.navLink}
                            active={campType === PROGRAM_DIVISION.방문형}
                            onClick={handleNavLink}
                        >
                            선생님용 (방문형)
                        </NavLink>
                    </NavItem>
                    <NavItem className={styles.navItem}>
                        <NavLink
                            tag="span"
                            data-id={PROGRAM_DIVISION.집합형}
                            className={styles.navLink}
                            active={campType === PROGRAM_DIVISION.집합형}
                            onClick={handleNavLink}
                        >
                            학생용 (집합형)
                        </NavLink>
                    </NavItem>
                </Nav>
            </section>

            <section>
                <SSRSuspense fallback={<ProgramsCardsLoading />}>
                    <ProgramsCards
                        campType={campType}
                        page={page}
                        setPage={setPage}
                        filterList={dropdowns}
                        searchValue={searchValue}
                    />
                </SSRSuspense>
            </section>
        </GridContainer>
    );
}
