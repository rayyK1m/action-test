import { Suspense } from 'react';
import BasicInfoComponent from './BasicInfo';
import BasicInfoLoading from './BasicInfo.loading';

export default function BasicInfo({ ...props }) {
    return (
        <Suspense fallback={<BasicInfoLoading />}>
            <BasicInfoComponent {...props} />
        </Suspense>
    );
}
