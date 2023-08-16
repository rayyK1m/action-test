import { ellipsisedString } from '@/utils';

export const getBreadcrumbs = (program, campId) => {
    return [
        {
            children: '프로그램 관리',
            to: '/institution/admin',
        },
        {
            children: <span>{ellipsisedString(program.name, 20)}</span>,
            to: `/institution/admin/program/${program.id}`,
        },
        {
            children: '캠프 관리',
            to: `/institution/admin/program/${program.id}/camp`,
        },
        {
            children: '캠프 상세',
            to: `/institution/admin/program/${program.id}/camp/${campId}`,
        },
        {
            children: '참가자 추가하기',
            active: true,
        },
    ];
};
