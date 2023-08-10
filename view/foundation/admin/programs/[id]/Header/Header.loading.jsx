import BackButton from './BackButton';

import styles from './Header.module.scss';

function HeaderLoading() {
    return (
        <div className={styles.container}>
            <BackButton />
        </div>
    );
}

export default HeaderLoading;
