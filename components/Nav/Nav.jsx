import cn from 'classnames';

import { Nav as GDSNav } from '@goorm-dev/gds-components';

import NavItem from './NavItem';
import NavLink from './NavLink';

function Nav({ size = 'md', tabs = false, className, children, ...props }) {
    return (
        <GDSNav
            tabs={tabs}
            className={cn(className, tabs && size === 'lg' && 'nav-tabs-lg')}
            {...props}
        >
            {children}
        </GDSNav>
    );
}

Nav.Item = NavItem;
Nav.Link = NavLink;

export default Nav;
