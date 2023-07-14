import { APPLY_STATUS } from '../CampCards/CampCards.constants';

export const BADGE_INFO = {
    [APPLY_STATUS.UPCOMING]: { text: '모집 예정', color: 'warning' },
    [APPLY_STATUS.IN_PROGRESS]: { text: '모집 중', color: 'primary' },
    [APPLY_STATUS.CLOSED]: { text: '모집 종료', color: 'info' },
};
