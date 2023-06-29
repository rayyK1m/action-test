import React from 'react';

import Header from '../Header/Header.jsx';
import ProgramTable from '../ProgramTable/ProgramTable.jsx';

import styles from './ProgramManageList.module.scss';

function ProgramManageList({ isSubmitted = false }) {
    return (
        <div className={styles.container}>
            <Header isSubmitted={isSubmitted} />

            <ProgramTable />
        </div>
    );
}

export default ProgramManageList;
