import { createRouter } from 'next-connect';

import campsCtrl from '@/server/controllers/camps';
import errorHandler from '@/server/utils/error/handler';
import validate from '@/server/middlewares/validate';
import { checkAuth } from '@/server/middlewares/auth';

import { ROLE } from '@/constants/db';

const router = createRouter();

router
    .use(validate(campsCtrl.validation.copyCamp))
    .use(checkAuth({ role: [ROLE.INSTITUTION] }))
    .post(campsCtrl.copyCamp);

export default router.handler({
    onError: errorHandler,
});
