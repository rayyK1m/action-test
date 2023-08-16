import { createRouter } from 'next-connect';

import institutionsCtrl from '@/server/controllers/institutions';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';

const router = createRouter();

router
    .use(checkAuth({ roles: [ROLE.INSTITUTION] }))
    .post(institutionsCtrl.submitReports);
router
    .use(checkAuth({ roles: [ROLE.INSTITUTION] }))
    .patch(institutionsCtrl.patchReports);

export default router.handler({
    onError: errorHandler,
});
