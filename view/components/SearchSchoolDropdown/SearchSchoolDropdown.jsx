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
import useOnClickOutside from '@/hooks/useOnClickOutside';

const SearchSchoolDropdown = forwardRef(
    (
        {
            isOpenDropdown = false,
            schoolList,
            schoolName,
            onClickDropdownItem = () => {},
            onBlur,
            onChangeSchoolName,
            errors,
            toggle,
        },
        ref,
    ) => {
        const sectionRef = useRef(null);
        const [isFocus, setIsFocus] = useState(false);

        const handleBlur = () => {
            onBlur();
            onChangeSchoolName('');
            setIsFocus(false);
        };

        return (
            <div ref={sectionRef}>
                <Dropdown isOpen={isOpenDropdown} toggle={toggle}>
                    <DropdownToggle tag="div">
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
                        <SearchDropdown
                            schoolList={schoolList}
                            onClickDropdownItem={onClickDropdownItem}
                            onChangeSchoolName={onChangeSchoolName}
                        />
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
    const onKeyDown = (event) => {
        event.preventDefault();
        const keyCode = event.keyCode || event.which;

        // 드롭다운 항목에 포커스 가 있는 상태에서, 엔터 입력시 학교 선택
        switch (keyCode) {
            case 13:
                onClickDropdownItem(schoolCode);
                break;
            default:
                break;
        }
    };

    // 항목 클릭시 학교 선택
    const onClickItem = () => {
        onClickDropdownItem(schoolCode);
        onChangeSchoolName(schoolName);
    };
    return (
        <DropdownItem
            className={styles.itemContainer}
            onClick={(e) => onClickItem(e.target)}
            onKeyDown={onKeyDown}
        >
            <div className={styles.item}>
                <p>{schoolName}</p>
                <p>{schoolAddress}</p>
            </div>
        </DropdownItem>
    );
};
export default SearchSchoolDropdown;
