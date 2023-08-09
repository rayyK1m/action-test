import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/campTickets';
import errorHandler from '@/server/utils/error/handler';
import { checkAuth } from '@/server/middlewares/auth';
import { ROLE } from '@/constants/db';

const router = createRouter();

router
    .use(checkAuth({ role: [ROLE.FOUNDATION, ROLE.INSTITUTION] }))
    .get(campTicketsCtrl.getCampTicketAdmin);

export default router.handler({
    onError: errorHandler,
});
