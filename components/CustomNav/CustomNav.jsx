import cn from 'classnames';

import { Nav } from '@goorm-dev/gds-components';

import CustomNavItem from './CustomNavItem';
import CustomNavLink from './CustomNavLink';

function CustomNav({
    size = 'md',
    tabs = false,
    className,
    children,
    ...props
}) {
    return (
        <Nav
            tabs={tabs}
            className={cn(className, tabs && size === 'lg' && 'nav-tabs-lg')}
            {...props}
        >
            {children}
        </Nav>
    );
}

CustomNav.Item = CustomNavItem;
CustomNav.Link = CustomNavLink;

export default CustomNav;
