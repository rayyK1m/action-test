import { createRouter } from 'next-connect';

import campsCtrl from '@/server/controllers/camps';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';
const router = createRouter();

router.use(checkAuth({ roles: ROLE.INSTITUTION })).post(campsCtrl.createCamp);

export default router.handler({
    onError: errorHandler,
});
