import cn from 'classnames';
import styles from './ContentContainer.module.scss';
import { forwardRef } from 'react';

const ContentContainer = ({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn(styles.container, className)} {...props} />
    );
};

export default forwardRef(ContentContainer);
