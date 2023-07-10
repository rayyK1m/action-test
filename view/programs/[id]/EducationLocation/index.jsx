import { Suspense } from 'react';
import EducationLocationComponent from './EducationLocation';
import EducationLocationLoading from './EducationLocation.loading';

const EducationLocation = () => {
    return (
        <Suspense fallback={<EducationLocationLoading />}>
            <EducationLocationComponent />
        </Suspense>
    );
};

export default EducationLocation;
