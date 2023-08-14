import cn from 'classnames';
import { NavLink } from '@goorm-dev/gds-components';

import styles from './CustomNavLink.module.scss';

function CustomNavLink({ className, children, ...props }) {
    return (
        <NavLink className={cn(styles.container, className)} {...props}>
            {children}
        </NavLink>
    );
}

export default CustomNavLink;
