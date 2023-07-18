import { createRouter } from 'next-connect';

import campTicketsCtrl from '@/server/controllers/camp-tickets';
import errorHandler from '@/server/utils/error/handler';

const router = createRouter();

router.post(campTicketsCtrl.createCampTicket);

export default router.handler({
    onError: errorHandler,
});
