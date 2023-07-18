import { useState } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@goorm-dev/gds-components';
import { ChevronDownIcon } from '@goorm-dev/gds-icons';
import styles from './FormDropdown.module.scss';
import FormWrapper from '../FormWrapper';
import useToggle from '@/hooks/useToggle';
import cn from 'classnames';

const FormDropdown = ({
    label,
    isRequired,
    placeholder,
    items,
    size,
    disabled,
    dropdownKey,
    readOnly,
    feedback,
    invalid,
    defaultValue,
    onChange,
    ...props
}) => {
    const [isOpen, toggle] = useToggle(false);
    const [value, setValue] = useState(placeholder);

    const handleclick = (item) => {
        setValue(item);
        onChange(item);
    };

    if (readOnly) {
        return (
            <FormWrapper
                label={label}
                isRequired={isRequired}
                feedback={feedback}
            >
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size={size}
                    className={styles.button}
                    disabled
                    active
                    {...props}
                >
                    {placeholder}
                </Button>
            </FormWrapper>
        );
    }

    return (
        <FormWrapper label={label} isRequired={isRequired} feedback={feedback}>
            <UncontrolledDropdown
                isOpen={isOpen}
                toggle={toggle}
                disabled={disabled}
            >
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="div"
                    onClick={(e) => e.preventDefault()}
                >
                    <Button
                        icon={<ChevronDownIcon />}
                        color="select"
                        iconSide="right"
                        size={size}
                        className={cn(
                            styles.button,
                            value === placeholder && styles.button_placeholder,
                            invalid && styles.invalidButton,
                        )}
                        disabled={disabled}
                        {...props}
                    >
                        {value}
                    </Button>
                </DropdownToggle>
                <DropdownMenu>
                    {items?.map((item) => (
                        <DropdownItem
                            key={item}
                            onClick={() => handleclick(item)}
                        >
                            {item}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
        </FormWrapper>
    );
};

FormDropdown.defaultProps = {
    size: 'lg',
    items: [],
};

export default FormDropdown;
