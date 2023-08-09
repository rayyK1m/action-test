import { createRouter } from 'next-connect';

import filesCtrl from '@/server/controllers/files';
import errorHandler from '@/server/utils/error/handler';

import validate from '@/server/middlewares/validate';
import { checkAuth } from '@/server/middlewares/auth';

const router = createRouter();

router
    .use(checkAuth())
    .use(validate(filesCtrl.validation.getPresignedUrl))
    .get(filesCtrl.getPresignedUrl);

export default router.handler({
    onError: errorHandler,
});
