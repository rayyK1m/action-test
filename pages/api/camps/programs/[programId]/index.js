import { createRouter } from 'next-connect';

import campsCtrl from '@/server/controllers/camps';
import errorHandler from '@/server/utils/error/handler';
import validate from '@/server/middlewares/validate';

const router = createRouter();

router.use(validate(campsCtrl.validation.getCamps)).get(campsCtrl.getCamps);

export default router.handler({
    onError: errorHandler,
});
