import { createRouter } from 'next-connect';

import campsCtrl from '@/server/controllers/camps';
import errorHandler from '@/server/utils/error/handler';
import validate from '@/server/middlewares/validate';
import { checkAuth } from '@/server/middlewares/auth';

import { ROLE } from '@/constants/db';

const router = createRouter();

router
    .use(validate(campsCtrl.validation.deleteCamps))
    .use(checkAuth({ role: [ROLE.INSTITUTION] }))
    .delete(campsCtrl.deleteCamps);

export default router.handler({
    onError: errorHandler,
});
