import { Suspense } from 'react';
import SummaryTableComponent from './SummaryTable';
import SummaryTableLoading from './SummaryTable.loading';

const SummaryTable = () => {
    return (
        <Suspense fallback={<SummaryTableLoading />}>
            <SummaryTableComponent />
        </Suspense>
    );
};

export default SummaryTable;
