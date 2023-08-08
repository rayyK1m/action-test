import ProgramTableLoading from '@/view/foundation/admin/components/ProgramTable/ProgramTable.loading';
import ProgramTable from '@/view/foundation/admin/components/ProgramTable/ProgramTable';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import GridContainer from '@/components/GridContainer';
import BackButton from './BackButton';

function FoundationAdminInstitutionPrograms() {
    const router = useRouter();
    return (
        <div>
            <GridContainer>
                <Suspense
                    fallback={
                        <ProgramTableLoading
                            columnsOption={{ institution: false }}
                        />
                    }
                    key={router.asPath}
                >
                    <BackButton />
                    <ProgramTable columnsOption={{ institution: false }} />
                </Suspense>
            </GridContainer>
        </div>
    );
}

export default FoundationAdminInstitutionPrograms;
