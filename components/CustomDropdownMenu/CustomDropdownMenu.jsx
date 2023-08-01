import cn from 'classnames';
import { DropdownMenu } from '@goorm-dev/gds-components';

import styles from './CustomDropdownMenu.module.scss';

function CustomDropdownMenu({ className, children, ...props }) {
    return (
        <DropdownMenu className={cn(className, styles.container)} {...props}>
            {children}
        </DropdownMenu>
    );
}

export default CustomDropdownMenu;
