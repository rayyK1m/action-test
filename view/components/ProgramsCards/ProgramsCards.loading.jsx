import ProgramsCardLoading from '../ProgramsCard/ProgramsCard.loading';

import styles from './ProgramsCards.module.scss';

function ProgramsCardsLoading() {
    return (
        <div className={styles.container}>
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
            <ProgramsCardLoading />
        </div>
    );
}

export default ProgramsCardsLoading;
