import cn from 'classnames';
import { NavItem } from '@goorm-dev/gds-components';

import styles from './CustomNavItem.module.scss';

function CustomNavItem({ className, children, ...props }) {
    return (
        <NavItem className={cn(styles.container, className)} {...props}>
            {children}
        </NavItem>
    );
}

export default CustomNavItem;
