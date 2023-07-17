import { Suspense } from 'react';

import ApplyButtonComponent from './ApplyButton';
import ApplyButtonLoading from './ApplyButton.loading';

const ApplyButton = () => {
    return (
        <Suspense fallback={<ApplyButtonLoading />}>
            <ApplyButtonComponent />
        </Suspense>
    );
};

export default ApplyButton;
