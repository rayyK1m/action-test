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

const FormDropdown = ({
    label,
    isRequired,
    placeholder,
    items,
    size,
    ...props
}) => {
    const [isOpen, toggle] = useToggle(false);
    const [value, setValue] = useState(placeholder);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <UncontrolledDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle data-toggle="dropdown" tag="div">
                    <Button
                        icon={<ChevronDownIcon />}
                        color="select"
                        iconSide="right"
                        size={size}
                        className={styles.button}
                        {...props}
                    >
                        {value}
                    </Button>
                </DropdownToggle>
                <DropdownMenu>
                    {items.map((item) => (
                        <DropdownItem key={item} onClick={() => setValue(item)}>
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
};

export default FormDropdown;
