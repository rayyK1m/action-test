import cn from 'classnames';
import styles from './Title.module.scss';

function Title({ isRequired, className, children, ...props }) {
    return (
        <span className={cn(styles.title, className)} {...props}>
            {children}
            {isRequired && <span className="ml-1 text-danger">*</span>}
        </span>
    );
}

export default Title;
