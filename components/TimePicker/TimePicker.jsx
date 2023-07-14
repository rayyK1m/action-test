import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { VariableSizeList as List } from 'react-window';
import dayjs from 'dayjs';

import {
    Input,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
} from '@goorm-dev/gds-components';
import { TimeIcon } from '@goorm-dev/gds-icons';

import { generateTimeList } from './TimePicker.utils';

import styles from './TimePicker.module.scss';

const { ampm: AMPM, hours: HOURS, minutes: MINUTES } = generateTimeList();

const ListItem = ({ value, style, isFocus, onClick }) => {
    return (
        <DropdownItem
            className={isFocus ? styles.active : ''}
            style={style}
            onClick={() => onClick(value)}
        >
            {value}
        </DropdownItem>
    );
};

const ListContainer = ({ items, selectedItem, onClickItem }) => {
    return (
        <div className={cn(styles.listWrapper, styles.divider)}>
            <List
                height={200}
                width={52}
                estimatedItemSize={32}
                itemSize={(idx) => (idx === 0 ? 36 : 32)}
                itemCount={items.length}
                className={styles.list}
            >
                {({ index, style }) => (
                    <ListItem
                        value={items[index]}
                        style={style}
                        isFocus={items[index] === selectedItem}
                        onClick={(value) => onClickItem(value)}
                    />
                )}
            </List>
        </div>
    );
};

const TIME_FORMAT = 'hh:mm a';

/**
 * 
 *
 * @param {String} size  input size, [sm, md, lg] default = 'lg' 
   @param {String} inputClassName
   @param {String} inputProps
   @param {Date} time 사용단에서의 자유로운 포맷팅을 위해 Date 객체 사용, dayjs 등의 라이브러리를 통해 time만 잘라서 사용 가능 
   @param {Object} placeholderTime { ampm: String, hour: String, minute: String}
   @param {Function} onChange 사용단에서 onChange={(time) => alert(time) } 과 같이 내려줄 수 있음

 * @returns {Date} ex) Sun May 07 2023(-- 오늘 날짜 --) 18:00:00 GMT+0900 (한국 표준시))
 */
function TimePicker({
    size = 'lg',
    inputClassName,
    inputProps,
    time,
    placeholderTime = { ampm: '오전', hour: '01', minute: '00' },
    onChange,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(time ? true : false);
    const [innerTime, setInnerTime] = useState(placeholderTime);

    useEffect(() => {
        const convertedHour = dayjs(time).format('hh');
        const convertedMinute = dayjs(time).format('mm');
        const convertedAmpm = dayjs(time).format('a');

        setInnerTime({
            ampm: convertedAmpm,
            hour: convertedHour,
            minute: convertedMinute,
        });
    }, [time]);

    const toggle = useCallback((e) => {
        if (e.target?.role === 'menuitem') return;

        setIsOpen((prev) => !prev);
    }, []);

    const handleClickItem = (itemKey, itemValue) => {
        if (!isDirty) setIsDirty(true);

        setInnerTime((prev) => {
            return {
                ...prev,
                [itemKey]: itemValue,
            };
        });

        const selectedTime = { ...innerTime, [itemKey]: itemValue };

        onChange(
            dayjs(
                `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.ampm}`,
                TIME_FORMAT,
                'ko',
            ).format(),
        );
    };

    return (
        <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle tag="div" className={styles.inputWrapper}>
                <Input
                    bsSize={size}
                    placeholder={`${placeholderTime.ampm} ${placeholderTime.hour}:${placeholderTime.minute}`}
                    className={cn(
                        styles.input,
                        isOpen ? styles.input_focus : '',
                        inputClassName,
                    )}
                    value={
                        !isDirty
                            ? ''
                            : `${innerTime.ampm} ${innerTime.hour}:${innerTime.minute}`
                    }
                    readOnly
                    {...inputProps}
                />
                <TimeIcon
                    className={cn(
                        styles.inputIcon,
                        styles[`inputIcon_${size}`],
                    )}
                />
            </DropdownToggle>

            <DropdownMenu
                className={cn(
                    isOpen ? 'd-flex' : 'd-none',
                    styles.dropdownMenu,
                )}
            >
                <ListContainer
                    items={AMPM}
                    onClickItem={(value) => handleClickItem('ampm', value)}
                    selectedItem={innerTime.ampm}
                />
                <ListContainer
                    items={HOURS}
                    onClickItem={(value) => handleClickItem('hour', value)}
                    selectedItem={innerTime.hour}
                />
                <ListContainer
                    items={MINUTES}
                    onClickItem={(value) => handleClickItem('minute', value)}
                    selectedItem={innerTime.minute}
                />
            </DropdownMenu>
        </Dropdown>
    );
}

export default React.memo(TimePicker);