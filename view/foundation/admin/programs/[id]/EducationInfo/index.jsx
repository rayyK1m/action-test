import { Suspense } from 'react';
import EducationInfoComponent from './EducationInfo';
import EducationInfoLoading from './EducationInfo.loading';

export default function EducationInfo({ ...props }) {
    return (
        <Suspense fallback={<EducationInfoLoading />}>
            <EducationInfoComponent {...props} />
        </Suspense>
    );
}
