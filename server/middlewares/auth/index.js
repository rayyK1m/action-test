import isEmpty from 'lodash/isEmpty';

import { withSessionRoute } from '@/server/utils/auth';
import ForbiddenError from '@/server/utils/error/ForbiddenError';
import UnauthorizedError from '@/server/utils/error/UnauthorizedError';

export const checkAuth = ({ roles = [] } = {}) =>
    withSessionRoute(async (req, res, next) => {
        const userData = req.session;
        if (!userData) {
            throw new UnauthorizedError({});
        }

        // TODO: 기관의 경우 기관에 맞는 api인지 권한 체크 필요
        if (!isEmpty(roles) && !roles.includes(userData.role)) {
            throw new ForbiddenError({
                userRole: userData.role,
                roles,
            });
        }
        return next();
    });
