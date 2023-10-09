import React, { useRef } from 'react';
import cn from 'classnames';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ErrorCircleIcon,
    NoticeCircleIcon,
    SearchIcon,
} from '@goorm-dev/gds-icons';
import {
    Input,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from '@goorm-dev/gds-components';
import styles from './SearchSchoolDropdown.module.scss';

const SearchSchoolDropdown = ({
    isOpenDropdown = false,
    schoolList,
    schoolName,
    onClickDropdownItem = () => {},
    onChangeSchoolName,
    errors,
    toggle,
}) => {
    const dropdownMenuRef = useRef(null);
    const inputRef = useRef(null);

    const handleBlur = (e) => {
        if (
            dropdownMenuRef.current &&
            !dropdownMenuRef.current.contains(e.relatedTarget)
        ) {
            onChangeSchoolName('');
        }
    };

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleErase = () => {
        onChangeSchoolName('');
        inputRef.current.focus();
        toggle(true);
    };

    return (
        <div>
            <Dropdown isOpen={isOpenDropdown} toggle={toggle}>
                <DropdownToggle tag="div" onKeyDown={handlePressEnter}>
                    <div className={styles.inputContainer}>
                        {isOpenDropdown && (
                            <SearchIcon
                                width="1.25rem"
                                height="1.25rem"
                                className={styles.searchIcon}
                            />
                        )}
                        <Input
                            ref={inputRef}
                            className={cn(
                                styles.input,
                                isOpenDropdown && styles.input__open,
                            )}
                            bsSize="lg"
                            type="text"
                            value={schoolName}
                            onChange={onChangeSchoolName}
                            onBlur={handleBlur}
                            placeholder="소속 학교"
                            invalid={!!errors}
                        />
                        {isOpenDropdown ? (
                            <div className={styles.rightIcon}>
                                <ErrorCircleIcon
                                    width="1.25rem"
                                    height="1.25rem"
                                    className="mr-2 text-gray-600"
                                    onClick={handleErase}
                                />
                                <ChevronUpIcon
                                    width="1.25rem"
                                    height="1.25rem"
                                    className="text-alternative"
                                />
                            </div>
                        ) : (
                            <ChevronDownIcon
                                className={styles.rightIcon}
                                width="1.25rem"
                                height="1.25rem"
                            />
                        )}
                    </div>
                </DropdownToggle>
                <DropdownMenu className={styles.dropdownMenu}>
                    <div ref={dropdownMenuRef}>
                        <SearchDropdown
                            schoolList={schoolList}
                            onClickDropdownItem={onClickDropdownItem}
                            onChangeSchoolName={onChangeSchoolName}
                            dropdownMenuRef={dropdownMenuRef}
                        />
                    </div>
                </DropdownMenu>
            </Dropdown>
            {!!errors && !isOpenDropdown && (
                <div className="d-flex align-items-center text-danger mt-1">
                    <NoticeCircleIcon />
                    <p className="ml-1">{errors.message}</p>
                </div>
            )}
        </div>
    );
};

/**
 * 학교 이름 드롭다운
 */
const SearchDropdown = ({
    schoolList,
    onClickDropdownItem,
    onChangeSchoolName,
}) => (
    <div className={styles.dropdownContainer}>
        <>
            {schoolList.length === 0 ? (
                <DropdownItem>검색 결과가 없습니다.</DropdownItem>
            ) : (
                <>
                    {schoolList?.map(({ code, name, address }) => (
                        <SearchDropdownItem
                            key={code}
                            schoolCode={code}
                            schoolName={name}
                            schoolAddress={address}
                            onClickDropdownItem={onClickDropdownItem}
                            onChangeSchoolName={onChangeSchoolName}
                        />
                    ))}
                </>
            )}
        </>
    </div>
);

/**
 * 학교 이름 드롭다운 항목
 */
const SearchDropdownItem = ({
    schoolCode,
    schoolName = '',
    schoolAddress = '',
    onClickDropdownItem,
    onChangeSchoolName,
}) => {
    // 항목 클릭시 학교 선택
    const onClickItem = () => {
        onClickDropdownItem(schoolCode);
        onChangeSchoolName(schoolName);
    };
    return (
        <DropdownItem
            className={styles.itemContainer}
            onClick={(e) => onClickItem(e.target)}
        >
            <div className={styles.item}>
                <p>{schoolName}</p>
                <p>{schoolAddress}</p>
            </div>
        </DropdownItem>
    );
};
export default SearchSchoolDropdown;
