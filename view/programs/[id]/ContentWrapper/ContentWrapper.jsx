import cn from 'classnames';
import styles from './ContentWrapper.module.scss';

const ContentWrapper = ({ className, children, ...props }) => {
    return (
        <div className={cn(styles.container, className)} {...props}>
            {children}
        </div>
    );
};

export default ContentWrapper;
