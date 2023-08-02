import { createRouter } from 'next-connect';

import programsCtrl from '@/server/controllers/programs';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.get(programsCtrl.getProgramAdmin);
router.patch(programsCtrl.patchProgramAdmin);

export default router.handler({
    onError: errorHandler,
});
