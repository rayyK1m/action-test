import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/campTickets';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.get(campTicketsCtrl.createCampTicket);

export default router.handler({
    onError: errorHandler,
});
