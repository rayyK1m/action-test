import React, { useState } from 'react';
import cn from 'classnames';
import dayjs from 'dayjs';

import {
    Input,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Calendar,
} from '@goorm-dev/gds-components';
import { CalendarIcon } from '@goorm-dev/gds-icons';

import styles from './CustomDatePicker.module.scss';

/**
 * @typedef CustomDatePickerProps
 * @property {'sm' | 'md' | 'lg'} [size='lg']
 * @property {string} [inputClassName]
 * @property {import('react').ComponentProps<typeof Input>} inputProps
 * @property {Date} date
 * @property {(date: Date) => void} onChange
 */

/**
 * CustomDatePicker
 *
 * @description 기존 DatePicker와 달리 GDS의 Calender 컴포넌트만 드롭다운으로 렌더링
 *
 * @param {CustomDatePickerProps} props
 * @returns {Date} ex) Tue Jul 11 2023 00:00:00 GMT+0900 (한국 표준시)
 */
function CustomDatePicker({
    size = 'lg',
    inputClassName,
    inputProps,
    date,
    onChange,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleChange = (date) => {
        onChange(date);
    };

    return (
        <>
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle tag="div" className={styles.inputWrapper}>
                    <Input
                        bsSize={size}
                        placeholder="YYYY.MM.DD"
                        className={cn(
                            styles.input,
                            isOpen ? styles.input_focus : '',
                            inputClassName,
                        )}
                        value={!date ? '' : dayjs(date).format('YYYY.MM.DD')}
                        readOnly
                        {...inputProps}
                    />
                    <CalendarIcon
                        className={cn(
                            styles.inputIcon,
                            styles[`inputIcon_${size}`],
                        )}
                    />
                </DropdownToggle>

                <DropdownMenu>
                    <Calendar locale="ko" onClickDay={handleChange} />
                </DropdownMenu>
            </Dropdown>
        </>
    );
}

export default CustomDatePicker;
