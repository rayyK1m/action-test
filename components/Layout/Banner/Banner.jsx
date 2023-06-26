import styles from './Banner.module.scss';

/** 우선적으로 틀만 구현 */
const Banner = ({ showBanner = true, children, ...props }) => {
    if (!showBanner) {
        return <></>;
    }
    return (
        <div className={styles.Banner} {...props}>
            {children}
        </div>
    );
};

export default Banner;
