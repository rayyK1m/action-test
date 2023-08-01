import cn from 'classnames';
import { NavLink as GDSNavLink } from '@goorm-dev/gds-components';

import styles from './NavLink.module.scss';

function NavLink({ className, children, ...props }) {
    return (
        <GDSNavLink className={cn(styles.container, className)} {...props}>
            {children}
        </GDSNavLink>
    );
}

export default NavLink;
