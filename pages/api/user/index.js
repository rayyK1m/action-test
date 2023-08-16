import { createRouter } from 'next-connect';

import userCtrl from '@/server/controllers/user';
import errorHandler from '@/server/utils/error/handler';
import { withSessionRoute } from '@/server/utils/auth';

const router = createRouter();

router.get(withSessionRoute(userCtrl.getUserInfo));

export default router.handler({
    onError: errorHandler,
});
