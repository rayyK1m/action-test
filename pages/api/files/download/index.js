import { createRouter } from 'next-connect';

import filesCtrl from '@/server/controllers/files';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.get(filesCtrl.getPresignedUrlWithPath);

export default router.handler({
    onError: errorHandler,
});
