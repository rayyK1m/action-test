import { createRouter } from 'next-connect';

import programsCtrl from '@/server/controllers/programs';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';

const router = createRouter();

// TODO: Joi validation 추가 필요
router
    .use(checkAuth({ role: [ROLE.INSTITUTION, ROLE.FOUNDATION] }))
    .post(programsCtrl.changeProgramReviewStatus);

export default router.handler({
    onError: errorHandler,
});
