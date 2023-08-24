import { Suspense, useState, useMemo } from 'react';
import cn from 'classnames';

import {
    ButtonDropdown,
    DropdownToggle,
    SearchInput,
    TextButton,
    Badge,
    Checkbox,
} from '@goorm-dev/gds-components';
import { CloseIcon, RefreshIcon } from '@goorm-dev/gds-icons';

import GridContainer from '@/components/GridContainer';
import SSRSuspense from '@/components/SSRSuspense';
import CustomNav from '@/components/CustomNav';
import CustomDropdownItem from '@/components/CustomDropdownItem';
import CustomDropdowMenu from '@/components/CustomDropdownMenu';

import {
    PROGRAM_LOCATION_CATEGORIES,
    PROGRAM_DIVISION,
    PROGRAM_CATEGORIES,
} from '@/constants/db';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';

import ProgramsCards from '../ProgramsCards';
import ProgramsCardsLoading from '../ProgramsCards/ProgramsCards.loading';
import ProgramsCountAndApplyableCheckboxLoading from '../ProgramsCountAndApplyableCheckbox/ProgramsCountAndApplyableCheckbox.loading';
import ProgramsCountAndApplyableCheckbox from '../ProgramsCountAndApplyableCheckbox';

import styles from './ProgramsContainer.module.scss';

export default function ProgramsContainer() {
    /** 운영지역 dropdown */
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const selectedLocations = selectedLocation
        ? PROGRAM_LOCATION_CATEGORIES[selectedLocation].join(',')
        : '';

    /** 카테고리 dropdown */
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [categories, setCategories] = useState(
        PROGRAM_CATEGORIES.map((category) => ({
            name: category,
            checked: false,
        })),
    );
    const checkedCategories = useMemo(
        () =>
            categories
                .filter(({ checked }) => checked)
                .map(({ name }) => name)
                .join(','),
        [categories],
    );

    /** 프로그램 이름 검색 */
    const [inputValue, setInputValue] = useState(''); // input onChange value
    const [searchValue, setSearchValue] = useState(''); // input onKeypress 'Enter' value

    /** 방문형, 집합형 선택 */
    const [campType, setCampType] = useState(PROGRAMS_DEFAULT_QUERY.campType);

    /** Pagination 관련 */
    const [page, setPage] = useState(PROGRAMS_DEFAULT_QUERY.page);

    /** 신청 가능한 프로그램 체크 여부 */
    const [isCheckPossibleApply, setIsCheckPossibleApply] = useState(false);

    /**
     * 필터 리스트 존재 여부
     * - 운영 지역 선택 여부
     * - 카테고리 한개라도 선택 여부
     */
    const hasFilterListValues = useMemo(
        () => !!selectedLocation || categories.some(({ checked }) => checked),
        [selectedLocation, categories],
    );

    /** 방문형, 집합항 Nav 핸들러 */
    const handleNavLink = (e) => {
        const { id } = e.target.dataset;
        setCampType(id);
        setPage(PROGRAMS_DEFAULT_QUERY.page);
    };
    /** 운영지역 Dropdown 핸들러 */
    const handleLocation = (e) => {
        const { name } = e.target.dataset;

        setSelectedLocation(name);
    };
    /** 카테고리 Dropdown 핸들러 */
    const handleCategory = (e) => {
        const { dataset } = e.currentTarget;

        const clickedElementName = dataset?.elementName; // 현재 클릭한 element 이름 (ex. "dropdonw-item", "dropdown-toggle", ...)
        const clickedCategoryName = dataset?.name; // 현재 클릭한 카테고리 이름 (ex. '드론', '메타버스', ...)

        if (clickedElementName === 'dropdown-item') {
            /**
             * DropdownItem 컴포넌트 클릭
             *
             * - Dropdown이 닫히지 않는다. (setIsCategoryDropdownOpen)
             * - 해당 카테고리의 체크박스가 토글된다. (setCategories)
             */
            setIsCategoryDropdownOpen(true);
            setCategories((prev) =>
                prev.map(({ name, checked }) => ({
                    name,
                    checked: name === clickedCategoryName ? !checked : checked,
                })),
            );
        } else {
            setIsCategoryDropdownOpen((prev) => !prev);
        }
    };
    /** 필터 리스트 UI 핸들러 */
    const handleFilterList = (e) => {
        const { componentType } = e.currentTarget.dataset;

        if (componentType === 'button-reset') {
            /** 초기화 버튼 클릭 */

            setSelectedLocation('');
            setCategories(
                PROGRAM_CATEGORIES.map((category) => ({
                    name: category,
                    checked: false,
                })),
            );
        } else if (componentType === 'badge-category') {
            /** 카테고리 뱃지 클릭 */
            const { categoryName } = e.currentTarget.dataset;

            setCategories((prev) =>
                prev.map(({ name, checked }) => ({
                    name,
                    checked: name === categoryName ? !checked : checked,
                })),
            );
        } else {
            /** 운영지역 뱃지 클릭 */
            setSelectedLocation('');
        }
    };
    /** 검색 핸들러 */
    const handleSearchInput = (e) => {
        const { value } = e.target;
        setInputValue(value);

        if (e.key === 'Enter') {
            setSearchValue(e.target.value);
            setPage(PROGRAMS_DEFAULT_QUERY.page);
        }
    };

    return (
        <GridContainer>
            <section
                className={cn(
                    styles.filterContainer,
                    hasFilterListValues &&
                        styles.filterContainer_showFilterList,
                )}
            >
                {/* 운영지역, 카테고리, 프로그램 이름 검색 */}
                <div className="d-flex align-items-center justify-content-between">
                    <ul className={cn('d-flex', styles.dropdowns)}>
                        <li>
                            <ButtonDropdown
                                isOpen={isLocationDropdownOpen}
                                toggle={() =>
                                    setIsLocationDropdownOpen((prev) => !prev)
                                }
                            >
                                <DropdownToggle size="lg" caret color="link">
                                    운영 지역
                                </DropdownToggle>
                                <CustomDropdowMenu>
                                    {Object.keys(
                                        PROGRAM_LOCATION_CATEGORIES,
                                    ).map((location) => (
                                        <CustomDropdownItem
                                            data-name={location}
                                            key={location}
                                            active={
                                                selectedLocation === location
                                            }
                                            onClick={handleLocation}
                                        >
                                            {location}
                                        </CustomDropdownItem>
                                    ))}
                                </CustomDropdowMenu>
                            </ButtonDropdown>
                        </li>
                        <li>
                            <ButtonDropdown
                                isOpen={isCategoryDropdownOpen}
                                toggle={handleCategory}
                            >
                                <DropdownToggle
                                    data-element-name="dropdown-toggle"
                                    size="lg"
                                    caret
                                    color="link"
                                >
                                    카테고리
                                </DropdownToggle>
                                <CustomDropdowMenu>
                                    {categories.map(({ name, checked }) => (
                                        <CustomDropdownItem
                                            key={name}
                                            data-element-name="dropdown-item"
                                            data-name={name}
                                            active={checked}
                                            className="d-flex"
                                        >
                                            <Checkbox
                                                readOnly
                                                checked={checked}
                                            />
                                            <p>{name}</p>
                                        </CustomDropdownItem>
                                    ))}
                                </CustomDropdowMenu>
                            </ButtonDropdown>
                        </li>
                    </ul>

                    <SearchInput
                        size="lg"
                        placeholder="프로그램 이름을 검색해보세요."
                        value={inputValue}
                        onChange={handleSearchInput}
                        onKeyDown={handleSearchInput}
                        onCancelClick={() => {
                            setInputValue('');
                            setSearchValue('');
                            setPage(PROGRAMS_DEFAULT_QUERY.page);
                        }}
                        className={styles.searchInput}
                    />
                </div>

                {/* 필터링 선택시 나오는 필터 리스트 UI */}
                {hasFilterListValues && (
                    <div
                        className={cn(
                            styles.filterList,
                            'd-flex align-items-center bg-gray-400-transparent-8',
                        )}
                    >
                        <TextButton
                            data-component-type="button-reset"
                            size="sm"
                            icon={RefreshIcon}
                            color="link"
                            className="text-info px-0 mr-3"
                            onClick={handleFilterList}
                        >
                            초기화
                        </TextButton>

                        {selectedLocation && (
                            <Badge
                                size="md"
                                color="primary"
                                className={styles.filterDeleteBadge}
                            >
                                {selectedLocation}
                                <CloseIcon
                                    data-component-type="badge-location"
                                    className={styles.filterDeleteButton}
                                    onClick={handleFilterList}
                                />
                            </Badge>
                        )}

                        {categories.map(
                            ({ name, checked }) =>
                                checked && (
                                    <Badge
                                        key={name}
                                        size="md"
                                        color="primary"
                                        className={styles.filterDeleteBadge}
                                    >
                                        {name}
                                        <CloseIcon
                                            data-component-type="badge-category"
                                            data-category-name={name}
                                            className={
                                                styles.filterDeleteButton
                                            }
                                            onClick={handleFilterList}
                                        />
                                    </Badge>
                                ),
                        )}
                    </div>
                )}

                {/* 방문형, 집합형 선택 */}
                <div>
                    <CustomNav tabs size="lg">
                        <CustomNav.Item>
                            <CustomNav.Link
                                tag="span"
                                data-id={PROGRAM_DIVISION.집합형}
                                active={campType === PROGRAM_DIVISION.집합형}
                                onClick={handleNavLink}
                            >
                                학생용 (집합형)
                            </CustomNav.Link>
                        </CustomNav.Item>
                        <CustomNav.Item>
                            <CustomNav.Link
                                tag="span"
                                data-id={PROGRAM_DIVISION.방문형}
                                active={campType === PROGRAM_DIVISION.방문형}
                                onClick={handleNavLink}
                            >
                                선생님용 (방문형)
                            </CustomNav.Link>
                        </CustomNav.Item>
                    </CustomNav>
                </div>
            </section>

            <section className={styles.listContainer}>
                {/* 전체 프로그램 수, 신청 가능한 프로그램 보기 */}
                <Suspense
                    fallback={<ProgramsCountAndApplyableCheckboxLoading />}
                >
                    <ProgramsCountAndApplyableCheckbox
                        campType={campType}
                        selectedLocations={selectedLocations}
                        checkedCategories={checkedCategories}
                        searchValue={searchValue}
                        page={page}
                        isCheckPossibleApply={isCheckPossibleApply}
                        setIsCheckPossibleApply={setIsCheckPossibleApply}
                    />
                </Suspense>

                {/* 프로그램 리스트 */}
                <SSRSuspense fallback={<ProgramsCardsLoading />}>
                    <ProgramsCards
                        campType={campType}
                        selectedLocations={selectedLocations}
                        checkedCategories={checkedCategories}
                        searchValue={searchValue}
                        page={page}
                        setPage={setPage}
                        isCheckPossibleApply={isCheckPossibleApply}
                    />
                </SSRSuspense>
            </section>
        </GridContainer>
    );
}
