import cn from 'classnames';
import styles from './Wrapper.module.scss';

function Wrapper({ isRow = false, isSameRatio = false, className, ...props }) {
    return (
        <div
            className={cn(
                isRow ? styles.rowWrapper : styles.colWrapper,
                { [styles.rowWrapper_isSameRatio]: isSameRatio },
                className,
            )}
            {...props}
        />
    );
}

export default Wrapper;
