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
 * 기존 DatePicker와 달리 GDS의 Calender 컴포넌트만 드롭다운으로 렌더링
 */
function CustomDatePicker({ size = 'lg', date, onChange }) {
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
                        )}
                        value={!date ? '' : dayjs(date).format('YYYY.MM.DD')}
                        readOnly
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
