import cn from 'classnames';
import styles from './Summary.module.scss';

function Summary({ className, ...props }) {
    return <div className={cn(styles.summary, className)} {...props} />;
}

export default Summary;
