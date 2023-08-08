import { useRouter } from 'next/router';

import GridContainer from '@/components/GridContainer';
import NavTab from '../components/NavTab';
import { Suspense } from 'react';
import InstitutionsTableLoading from './InstitutionsTable/InstitutionsTable.loading';
import InstitutionsTable from './InstitutionsTable/InstitutionsTable';

function FoundationAdminInstitutions() {
    const router = useRouter();

    return (
        <div>
            <GridContainer>
                <NavTab />
                <Suspense
                    fallback={<InstitutionsTableLoading />}
                    key={router.asPath}
                >
                    <InstitutionsTable />
                </Suspense>
            </GridContainer>
        </div>
    );
}

export default FoundationAdminInstitutions;
