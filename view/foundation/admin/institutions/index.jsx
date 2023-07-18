// import { useRouter } from 'next/router';

import GridContainer from '@/components/GridContainer';
import NavTab from '../components/NavTab';

function FoundationAdminInstitutions() {
    // const router = useRouter();
    return (
        <div>
            <GridContainer>
                <NavTab />
            </GridContainer>
        </div>
    );
}

export default FoundationAdminInstitutions;
