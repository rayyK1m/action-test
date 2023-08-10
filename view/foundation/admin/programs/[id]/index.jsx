import { useRouter } from 'next/router';
import { Suspense } from 'react';

import GridContainer from '@/components/GridContainer';

import Header from './Header';
import BasicInfo from './BasicInfo';
import ApplicationInfo from './ApplicationInfo';
import EducationInfo from './EducationInfo';
import Container from './Container';
import AnotherPrograms from './AnotherPrograms';

function FoundationAdminProgram() {
    const router = useRouter();

    return (
        <div>
            <GridContainer colProps={{ xs: { size: 10, offset: 1 } }}>
                <Header />
                <Container>
                    <BasicInfo />
                    <Suspense fallback={<>...loading</>} key={router.asPath}>
                        <ApplicationInfo />
                        <EducationInfo />
                        <AnotherPrograms />
                    </Suspense>
                </Container>
            </GridContainer>
        </div>
    );
}

export default FoundationAdminProgram;
