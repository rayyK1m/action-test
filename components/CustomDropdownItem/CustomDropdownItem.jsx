import cn from 'classnames';

import { DropdownItem } from '@goorm-dev/gds-components';

import styles from './CustomDropdownItem.module.scss';

function CustomDropdownItem({ className, active, children, ...props }) {
    return (
        <DropdownItem
            active={active}
            className={cn(
                className,
                styles.container,
                active && styles.container_active,
            )}
            {...props}
        >
            {children}
        </DropdownItem>
    );
}

export default CustomDropdownItem;
