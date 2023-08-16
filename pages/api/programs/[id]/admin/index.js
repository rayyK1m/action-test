import { createRouter } from 'next-connect';

import programsCtrl from '@/server/controllers/programs';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';

const router = createRouter();

router.get(programsCtrl.getProgramAdmin);
router
    .use(checkAuth({ roles: [ROLE.INSTITUTION] }))
    .patch(programsCtrl.patchProgramAdmin);

export default router.handler({
    onError: errorHandler,
});
