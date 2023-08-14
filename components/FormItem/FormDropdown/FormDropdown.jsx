import { useRef } from 'react';
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
    value,
    items,
    size,
    disabled,
    readOnly,
    feedback,
    invalid,
    onChange,
    onBlur,
    className,
    ...props
}) => {
    const [isOpen, toggle] = useToggle(false);
    const dropdownRef = useRef(null);

    const handleBlur = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.relatedTarget)
        ) {
            onBlur();
        }
    };

    if (readOnly || disabled) {
        return (
            <FormWrapper label={label} isRequired={isRequired}>
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size={size}
                    className={cn(
                        styles.button,
                        readOnly && styles.readOnlyButton,
                    )}
                    disabled
                    {...props}
                >
                    {value}
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
                direction="down"
            >
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="div"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
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
                            className,
                        )}
                        disabled={disabled}
                        onBlur={handleBlur}
                        {...props}
                    >
                        {value}
                    </Button>
                </DropdownToggle>
                <DropdownMenu className="w-100">
                    <div ref={dropdownRef}>
                        {items?.map((item) => (
                            <DropdownItem
                                //className="w-100"
                                key={item}
                                onClick={() => onChange(item)}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    </div>
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
