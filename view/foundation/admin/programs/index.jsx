import ProgramTableLoading from './ProgramTable/ProgramTable.loading';
import ProgramTable from './ProgramTable/ProgramTable';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import GridContainer from '@/components/GridContainer';
import NavTab from '../components/NavTab';

function FoundationAdminPrograms() {
    const router = useRouter();
    return (
        <div>
            <GridContainer>
                <NavTab />
                <Suspense
                    fallback={<ProgramTableLoading />}
                    key={router.asPath}
                >
                    <ProgramTable />
                </Suspense>
            </GridContainer>
        </div>
    );
}

export default FoundationAdminPrograms;
