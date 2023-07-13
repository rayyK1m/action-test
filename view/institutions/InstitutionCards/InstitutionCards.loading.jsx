import InstitutionCardLoading from '../InstitutionCard/InstitutionCard.loading';

import styles from './InstitutionCards.module.scss';

function InstitutionCardsLoading() {
    return (
        <div className={styles.container}>
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
            <InstitutionCardLoading />
        </div>
    );
}

export default InstitutionCardsLoading;
