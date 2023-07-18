import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/campTickets';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.post(campTicketsCtrl.cancelCampTicket);

export default router.handler({
    onError: errorHandler,
});
