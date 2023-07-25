import { createRouter } from 'next-connect';

import schoolCtrl from '@/server/controllers/school';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.get(schoolCtrl.getSchools);

export default router.handler({
    onError: errorHandler,
});
