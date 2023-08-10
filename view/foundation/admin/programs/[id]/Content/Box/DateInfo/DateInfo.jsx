import cn from 'classnames';

import { formatDate } from '@/utils';

import styles from './DateInfo.module.scss';
import { CalendarIcon } from '@goorm-dev/gds-icons';

function DateInfo({ start, end, className, children, ...props }) {
    return (
        <div
            className={cn(styles.container, 'paragraph-lg', className)}
            {...props}
        >
            <CalendarIcon />
            {formatDate(start)}
            {' ~ '}
            {formatDate(end)}
        </div>
    );
}

export default DateInfo;
