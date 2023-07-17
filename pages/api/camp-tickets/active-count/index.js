import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/campTickets';
import errorHandler from '@/server/utils/error/handler';

import { checkAuth } from '@/server/middlewares/auth';

const router = createRouter();

// TODO: Joi validation 추가 필요
router.use(checkAuth()).get(campTicketsCtrl.getCampTicketsCount);

export default router.handler({
    onError: errorHandler,
});
