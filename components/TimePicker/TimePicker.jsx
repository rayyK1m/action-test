import React, { useCallback, useState } from 'react';
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

function TimePicker({ size = 'lg', inputClassName, time, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [innerTime, setInnerTime] = useState({
        ampm: '오전',
        hour: '01',
        minute: '00',
    });

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
                'hh:mm a',
                'ko',
            ).format(),
        );
    };

    return (
        <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle tag="div" className={styles.inputWrapper}>
                <Input
                    bsSize={size}
                    placeholder="오전 01:00"
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
                    selectedItem={time.ampm}
                />
                <ListContainer
                    items={HOURS}
                    onClickItem={(value) => handleClickItem('hour', value)}
                    selectedItem={time.hour}
                />
                <ListContainer
                    items={MINUTES}
                    onClickItem={(value) => handleClickItem('minute', value)}
                    selectedItem={time.minute}
                />
            </DropdownMenu>
        </Dropdown>
    );
}

export default React.memo(TimePicker);
