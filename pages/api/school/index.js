import { createRouter } from 'next-connect';

import schoolCtrl from '@/server/controllers/school';
import errorHandler from '@/server/utils/error/handler';
import { withSessionRoute } from '@/server/utils/auth';

const router = createRouter();

router.get(withSessionRoute(schoolCtrl.getSchools));

export default router.handler({
    onError: errorHandler,
});
