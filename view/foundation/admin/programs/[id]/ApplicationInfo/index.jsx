import { Suspense } from 'react';
import ApplicationInfoComponent from './ApplicationInfo';
import ApplicationInfoLoading from './ApplicationInfo.loading';

export default function ApplicationInfo({ ...props }) {
    return (
        <Suspense fallback={<ApplicationInfoLoading />}>
            <ApplicationInfoComponent {...props} />
        </Suspense>
    );
}
