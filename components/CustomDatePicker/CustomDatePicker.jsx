import React, { useState, forwardRef, useRef } from 'react';
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
const CustomDatePicker = forwardRef(
    (
        {
            size = 'lg',
            inputClassName,
            inputProps,
            calendarProps,
            date,
            onChange,
            disabled,
        },
        ref,
    ) => {
        const calendarRef = useRef(null);
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => {
            setIsOpen((prev) => !prev);
        };
        const { onBlur, ...restProps } = inputProps;

        const handleChange = (date) => {
            onChange(date);
        };

        const handleBlur = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.relatedTarget)
            ) {
                onBlur();
            }
        };

        return (
            <>
                <Dropdown
                    isOpen={isOpen}
                    toggle={toggle}
                    disabled={disabled}
                    className={disabled ? styles.disabled : ''}
                >
                    <DropdownToggle tag="div" className={styles.inputWrapper}>
                        <Input
                            ref={ref}
                            bsSize={size}
                            placeholder="YYYY.MM.DD"
                            className={cn(
                                styles.input,
                                isOpen ? styles.input_focus : '',
                                inputClassName,
                            )}
                            value={
                                !date ? '' : dayjs(date).format('YYYY.MM.DD')
                            }
                            onBlur={handleBlur}
                            {...restProps}
                        />
                        <CalendarIcon
                            className={cn(
                                styles.inputIcon,
                                styles[`inputIcon_${size}`],
                            )}
                        />
                    </DropdownToggle>

                    <DropdownMenu>
                        <div ref={calendarRef}>
                            <Calendar
                                locale="ko"
                                onClickDay={handleChange}
                                {...calendarProps}
                            />
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    },
);

CustomDatePicker.displayName = 'CustomDatePicker';

export default CustomDatePicker;
