import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/campTickets';
import errorHandler from '@/server/utils/error/handler';

import { withSessionRoute } from '@/server/utils/auth';

const router = createRouter();

router.get(withSessionRoute(campTicketsCtrl.getCampTicketHistory));

export default router.handler({
    onError: errorHandler,
});
