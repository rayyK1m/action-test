import { createRouter } from 'next-connect';

import filesCtrl from '@/server/controllers/files';
import errorHandler from '@/server/utils/error/handler';

import { checkAuth } from '@/server/middlewares/auth';

const router = createRouter();

router.use(checkAuth()).get(filesCtrl.getPresignedUrlWithPath);

export default router.handler({
    onError: errorHandler,
});
