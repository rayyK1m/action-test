import React from 'react';
import cn from 'classnames';

import { Alert } from '@goorm-dev/gds-components';

import styles from './CustomAlert.module.scss';

function CustomAlert({ children, className, ...props }) {
    return (
        <Alert className={cn(className, styles.alert)} {...props}>
            {children}
        </Alert>
    );
}

export default CustomAlert;
