import InstitutionCardLoading from '../InstitutionCard/InstitutionCard.loading';

import styles from './InstitutionCards.module.scss';

function InstitutionCardsLoading() {
    return (
        <div className={styles.container}>
            {Array.from({ length: 11 }, (_, index) => index).map((i) => (
                <InstitutionCardLoading key={i} />
            ))}
        </div>
    );
}

export default InstitutionCardsLoading;
