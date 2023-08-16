import { ROLE } from '@/constants/db';
import { checkAuthSsr } from '@/server/utils/auth';

export default function FoundationAdminPage() {
    return <></>;
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async () => {
    return {
        redirect: {
            destination: '/foundation/admin/programs',
        },
    };
});
