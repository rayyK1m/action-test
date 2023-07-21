import { createRouter } from 'next-connect';

import programsCtrl from '@/server/controllers/programs';
import errorHandler from '@/server/utils/error/handler';
import validate from '@/server/middlewares/validate';

const router = createRouter();

router
    .use(validate(programsCtrl.validation.getPrograms))
    .get(programsCtrl.getPrograms);

export default router.handler({
    onError: errorHandler,
});
