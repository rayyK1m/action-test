import cn from 'classnames';
import styles from './Summary.module.scss';

function Summary({ className, isBlock = false, ...props }) {
    return (
        <span
            className={cn('h6', { [styles.container]: isBlock }, className)}
            {...props}
        />
    );
}

export default Summary;
