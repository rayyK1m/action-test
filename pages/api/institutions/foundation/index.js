import { createRouter } from 'next-connect';

import institutionsCtrl from '@/server/controllers/institutions';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';

const router = createRouter();

/** TODO: validation 추가 */
router
    .use(checkAuth({ roles: ['foundation'] }))
    .get(institutionsCtrl.getInstitutionsFoundation);

export default router.handler({
    onError: errorHandler,
});
