import { ellipsisedString } from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';

export const getCampBreadcrumbs = (program) => {
    return [
        {
            children: '프로그램 관리',
            to: '/institution/admin',
        },
        {
            children: (
                <>
                    <span>{ellipsisedString(program.name, 20)}</span>
                    <ProgramTypeBadge
                        className="ml-1"
                        division={program.type.division}
                        duration={program.type.duration}
                    />
                </>
            ),
            to: `/institution/admin/program/${program.id}`,
        },
        {
            children: '캠프 관리',
            to: `/institution/admin/program/${program.id}/camp?division=${program.type.division}`,
        },
        {
            children: '캠프 상세',
            active: true,
        },
    ];
};
