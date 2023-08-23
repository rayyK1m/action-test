import { useContext } from 'react';
import { Badge as GDSBadge } from '@goorm-dev/gds-components';

import {
    BADGE_COLOR_MAP,
    BADGE_ICON_MAP,
    BADGE_TEXT_MAP,
} from './Badge.constants';
import styles from './Badge.module.scss';

import { ConfirmModalContext } from '../../ConfirmModal';

function Badge() {
    const { rowData } = useContext(ConfirmModalContext);
    const { submitFileStatus } = rowData;

    return (
        <GDSBadge
            size="md"
            color={BADGE_COLOR_MAP[submitFileStatus]}
            leftIcon={BADGE_ICON_MAP[submitFileStatus]}
        >
            {BADGE_TEXT_MAP[submitFileStatus]}
        </GDSBadge>
    );
}

export default Badge;
