import styles from './CustomTooltip.module.scss';

function CustomTooltip({ children }) {
    if (!children) {
        return <></>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.tooltip}>{children}</div>
        </div>
    );
}

export default CustomTooltip;
