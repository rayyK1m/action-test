import { createRouter } from 'next-connect';

import institutionsCtrl from '@/server/controllers/institutions';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.get(institutionsCtrl.getInstitutions);

export default router.handler({
    onError: errorHandler,
});
