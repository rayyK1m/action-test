import { Suspense } from 'react';
import AnotherProgramsComponent from './AnotherPrograms';
import AnotherProgramsLoading from './AnotherPrograms.loading';

export default function AnotherPrograms({ ...props }) {
    return (
        <Suspense fallback={<AnotherProgramsLoading />}>
            <AnotherProgramsComponent {...props} />
        </Suspense>
    );
}
