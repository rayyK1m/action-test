import { createRouter } from 'next-connect';

import institutionsCtrl from '@/server/controllers/institutions';
import errorHandler from '@/server/utils/error/handler';
import validate from '@/server/middlewares/validate';

const router = createRouter();

router
    .use(validate(institutionsCtrl.validation.getInstitutions))
    .get(institutionsCtrl.getInstitutions);

export default router.handler({
    onError: errorHandler,
});
