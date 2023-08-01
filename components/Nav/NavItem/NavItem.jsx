import cn from 'classnames';
import { NavItem as GDSNavItem } from '@goorm-dev/gds-components';

import styles from './NavItem.module.scss';

function NavItem({ className, children, ...props }) {
    return (
        <GDSNavItem className={cn(styles.container, className)} {...props}>
            {children}
        </GDSNavItem>
    );
}

export default NavItem;
