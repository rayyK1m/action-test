import React, { forwardRef, useState, useRef } from 'react';
import styles from './SearchSchoolDropdown.module.scss';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import {
    Input,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from '@goorm-dev/gds-components';

const SearchSchoolDropdown = forwardRef(
    (
        {
            isOpenDropdown = false,
            schoolList,
            schoolName,
            onClickDropdownItem = () => {},
            onChangeSchoolName,
            errors,
            toggle,
        },
        ref,
    ) => {
        const sectionRef = useRef(null);
        const dropdownMenuRef = useRef(null);
        const [isFocus, setIsFocus] = useState(false);

        const handleBlur = (e) => {
            if (
                dropdownMenuRef.current &&
                !dropdownMenuRef.current.contains(e.relatedTarget)
            ) {
                onChangeSchoolName('');
                setIsFocus(false);
            }
        };

        const handlePressEnter = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };

        return (
            <div ref={sectionRef}>
                <Dropdown isOpen={isOpenDropdown} toggle={toggle}>
                    <DropdownToggle tag="div" onKeyDown={handlePressEnter}>
                        <Input
                            ref={ref}
                            className={styles.input}
                            bsSize="lg"
                            type="text"
                            value={schoolName}
                            onChange={onChangeSchoolName}
                            onKey
                            onBlur={handleBlur}
                            onFocus={() => setIsFocus(true)}
                            placeholder="소속 학교"
                            invalid={!!errors}
                        />
                        {!!errors && !isFocus && (
                            <div className="d-flex align-items-center text-danger mt-1">
                                <NoticeCircleIcon />
                                <p className="ml-1">{errors.message}</p>
                            </div>
                        )}
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
            </div>
        );
    },
);

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
