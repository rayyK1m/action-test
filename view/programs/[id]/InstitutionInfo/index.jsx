import { Suspense } from 'react';

import InstitutionInfoComponent from './InstitutionInfo';
import InstitutionInfoLoading from './InstitutionInfo.loading';

const InstitutionInfo = () => {
    return (
        <Suspense fallback={<InstitutionInfoLoading />}>
            <InstitutionInfoComponent />
        </Suspense>
    );
};

export default InstitutionInfo;
