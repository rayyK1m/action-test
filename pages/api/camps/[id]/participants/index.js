import { createRouter } from 'next-connect';

import campsCtrl from '@/server/controllers/camps';
import errorHandler from '@/server/utils/error/handler';

import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';

const router = createRouter();

// TODO: Joi validation 추가 필요
router
    .use(checkAuth({ role: [ROLE.INSTITUTION] }))
    .post(campsCtrl.addCampParticipants);

router
    .use(checkAuth({ role: [ROLE.INSTITUTION] }))
    .delete(campsCtrl.deleteCampParticipants);

export default router.handler({
    onError: errorHandler,
});
